<?php

namespace App\Http\Controllers;

use App\Models\BonusClaim;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    /**
     * Store Page View.
     */
    public function index(Request $request): Response
    {
        $packages = [
            ['eur' => 10.00, 'bonus_percent' => 5, 'base_sc' => 5.00, 'bonus_sc' => 0.25, 'total_sc' => 5.25, 'vip_points' => 1000],
            ['eur' => 50.00, 'bonus_percent' => 10, 'base_sc' => 25.00, 'bonus_sc' => 2.50, 'total_sc' => 27.50, 'vip_points' => 5000],
            ['eur' => 100.00, 'bonus_percent' => 15, 'base_sc' => 50.00, 'bonus_sc' => 7.50, 'total_sc' => 57.50, 'vip_points' => 10000],
            ['eur' => 250.00, 'bonus_percent' => 20, 'base_sc' => 125.00, 'bonus_sc' => 25.00, 'total_sc' => 150.00, 'vip_points' => 25000],
            ['eur' => 500.00, 'bonus_percent' => 25, 'base_sc' => 250.00, 'bonus_sc' => 62.50, 'total_sc' => 312.50, 'vip_points' => 50000],
            ['eur' => 1000.00, 'bonus_percent' => 30, 'base_sc' => 500.00, 'bonus_sc' => 150.00, 'total_sc' => 650.00, 'vip_points' => 100000],
        ];

        return Inertia::render('Store', [
            'packages' => $packages,
        ]);
    }

    /**
     * Purchase Package or Custom Amount.
     */
    public function buy(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $eur = (float) $request->input('eur', 10.00);
        if ($eur < 5.00) {
            return response()->json(['success' => false, 'message' => 'Minimum deposit is €5.00'], 400);
        }

        // Calculate bonus percentage
        $bonusPercent = 5;
        if ($eur >= 1000.00) {
            $bonusPercent = 30;
        } elseif ($eur >= 500.00) {
            $bonusPercent = 25;
        } elseif ($eur >= 250.00) {
            $bonusPercent = 20;
        } elseif ($eur >= 100.00) {
            $bonusPercent = 15;
        } elseif ($eur >= 50.00) {
            $bonusPercent = 10;
        }

        $baseSc = $eur * 0.50; // 1 EUR = 0.50 SC
        $bonusSc = $baseSc * ($bonusPercent / 100);
        $totalSc = round($baseSc + $bonusSc, 2);
        $vipPtsEarned = (int) ($eur * 100);

        // Update user
        $user->game_balance += $totalSc;
        $user->vip_points += $vipPtsEarned;

        // Calculate VIP level
        $user->vip_level = static::calculateVipLevel($user->vip_points);
        $user->save();

        // Audit log
        BonusClaim::create([
            'user_id' => $user->id,
            'type' => 'store_pack',
            'amount' => $totalSc,
            'details' => [
                'eur' => $eur,
                'bonus_percent' => $bonusPercent,
                'base_sc' => $baseSc,
                'bonus_sc' => $bonusSc,
                'vip_points' => $vipPtsEarned,
            ],
            'created_at' => now(),
        ]);

        // Send financial deposit receipt email
        $orderId = 'ORD-' . strtoupper(str()->random(10));
        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(
                new \App\Mail\DepositSuccessfulMail($user, $orderId, $eur, $totalSc, (float) $user->game_balance)
            );
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('Failed sending DepositSuccessfulMail: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'new_balance' => (float) $user->game_balance,
            'total_sc_received' => $totalSc,
            'vip_points_gained' => $vipPtsEarned,
            'vip_level' => $user->vip_level,
            'message' => "Successfully purchased! Received {$totalSc} SC + {$vipPtsEarned} VIP points.",
        ]);
    }

    public static function calculateVipLevel(int $vipPoints): int
    {
        if ($vipPoints >= 25000) return 10; // Diamond Whale
        if ($vipPoints >= 10000) return 8;  // Platinum
        if ($vipPoints >= 5000) return 5;   // Gold
        if ($vipPoints >= 2500) return 3;   // Silver
        if ($vipPoints >= 1000) return 2;   // Bronze
        return 1;
    }
}
