<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameTransaction;
use App\Models\LiveCommunityWin;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GgrGoldApiController extends Controller
{
    /**
     * Handle incoming Seamless Wallet Webhook callbacks from NexusGGR.
     */
    public function handle(Request $request): JsonResponse
    {
        $secret = $request->header('Agent-Secret') 
            ?? $request->input('agent_secret') 
            ?? $request->input('agentSecret');

        $expectedSecret = config('services.nexus.agent_secret', '0fbfd24390fac179e21e1ccee9d243ff');

        if ($secret !== $expectedSecret) {
            return response()->json([
                'status' => 0,
                'msg' => 'INVALID_SECRET',
            ], 401);
        }

        $method = $request->input('method');

        return match ($method) {
            'user_balance' => $this->handleUserBalance($request),
            'transaction' => $this->handleTransaction($request),
            default => response()->json([
                'status' => 0,
                'msg' => 'INVALID_METHOD',
            ], 400),
        };
    }

    /**
     * Method: user_balance
     */
    protected function handleUserBalance(Request $request): JsonResponse
    {
        $userCode = $request->input('user_code');
        $user = User::where('user_code', $userCode)->first();

        if (!$user || $user->is_banned) {
            return response()->json([
                'status' => 0,
                'user_balance' => 0.00,
                'msg' => 'USER_BLOCKED',
            ]);
        }

        return response()->json([
            'status' => 1,
            'user_balance' => (float) $user->game_balance,
            'msg' => 'SUCCESS',
        ]);
    }

    /**
     * Method: transaction
     */
    protected function handleTransaction(Request $request): JsonResponse
    {
        $userCode = $request->input('user_code');
        $txnId = $request->input('txn_id');
        $txnIdV2 = $request->input('txn_id_v2') ?? $txnId;
        $txnType = $request->input('txn_type', 'debit_credit');
        $roundId = $request->input('round_id');
        $gameCode = $request->input('game_code');

        // Extract nested bet_money & win_money from slot, live, SB, or MN objects
        $betMoney = 0.00;
        $winMoney = 0.00;

        foreach (['slot', 'live', 'SB', 'MN'] as $key) {
            if ($request->has($key) && is_array($request->input($key))) {
                $subData = $request->input($key);
                $betMoney += (float) ($subData['bet_money'] ?? $subData['bet'] ?? 0);
                $winMoney += (float) ($subData['win_money'] ?? $subData['win'] ?? 0);
            }
        }

        if ($betMoney == 0.00 && $request->has('bet_money')) {
            $betMoney = (float) $request->input('bet_money');
        }
        if ($winMoney == 0.00 && $request->has('win_money')) {
            $winMoney = (float) $request->input('win_money');
        }

        // 1. Idempotency Check
        $existingTx = GameTransaction::where('txn_id_v2', $txnIdV2)
            ->orWhere(function ($q) use ($txnId) {
                if ($txnId) {
                    $q->where('txn_id', $txnId);
                }
            })->first();

        if ($existingTx) {
            return response()->json([
                'status' => 1,
                'user_balance' => (float) $existingTx->after_balance,
                'msg' => 'DUPLICATE_TRANSACTION_SKIPPED',
            ], 200);
        }

        // 2. Atomic DB Transaction with Pessimistic Row Lock
        try {
            return DB::transaction(function () use ($userCode, $txnId, $txnIdV2, $txnType, $roundId, $gameCode, $betMoney, $winMoney, $request) {
                $user = User::where('user_code', $userCode)->lockForUpdate()->first();

                if (!$user || $user->is_banned) {
                    return response()->json([
                        'status' => 0,
                        'user_balance' => 0.00,
                        'msg' => 'USER_BLOCKED',
                    ]);
                }

                $beforeBalance = (float) $user->game_balance;

                if ($beforeBalance < $betMoney) {
                    return response()->json([
                        'status' => 0,
                        'user_balance' => $beforeBalance,
                        'msg' => 'INSUFFICIENT_FUNDS',
                    ]);
                }

                $afterBalance = round($beforeBalance - $betMoney + $winMoney, 2);
                $user->game_balance = $afterBalance;
                $user->save();

                $game = Game::where('game_code', $gameCode)->first();
                if ($game) {
                    $game->increment('play_count');
                }

                // 3. Create Audit Log
                GameTransaction::create([
                    'user_id' => $user->id,
                    'game_id' => $game?->id,
                    'user_code' => $userCode,
                    'txn_id' => $txnId ?? Str::uuid()->toString(),
                    'txn_id_v2' => $txnIdV2 ?? Str::uuid()->toString(),
                    'txn_type' => $txnType,
                    'round_id' => $roundId,
                    'bet_amount' => $betMoney,
                    'win_amount' => $winMoney,
                    'before_balance' => $beforeBalance,
                    'after_balance' => $afterBalance,
                    'raw_payload' => $request->all(),
                    'created_at' => now(),
                ]);

                // 4. Community Big Win Broadcaster (Win >= 20.00 SC)
                if ($winMoney >= 20.00) {
                    $multiplier = $betMoney > 0 ? round($winMoney / $betMoney, 2) : 1.0;
                    LiveCommunityWin::create([
                        'user_id' => $user->id,
                        'user_code' => $user->user_code,
                        'game_name' => $game?->name ?? $gameCode ?? 'Pragmatic Slot',
                        'bet_amount' => $betMoney,
                        'win_amount' => $winMoney,
                        'multiplier' => $multiplier,
                        'created_at' => now(),
                    ]);
                }

                return response()->json([
                    'status' => 1,
                    'user_balance' => $afterBalance,
                    'msg' => 'SUCCESS',
                ]);
            });
        } catch (\Exception $e) {
            Log::error('NexusGGR Transaction Exception: ' . $e->getMessage());

            return response()->json([
                'status' => 0,
                'user_balance' => 0.00,
                'msg' => 'TRANSACTION_FAILED',
            ], 500);
        }
    }
}
