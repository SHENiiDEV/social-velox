<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\LiveCommunityWin;
use App\Models\User;
use App\Models\UserFavorite;
use App\Services\NexusGgrService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    protected NexusGgrService $nexusService;

    public function __construct(NexusGgrService $nexusService)
    {
        $this->nexusService = $nexusService;
    }

    /**
     * Casino Lobby View with Catalog, Featured Games, and Live Wins.
     */
    public function index(Request $request): Response
    {
        $category = $request->query('category', 'all');
        $search = $request->query('search');

        $query = Game::where('is_active', true);

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $games = $query->orderBy('is_featured', 'desc')
            ->orderBy('play_count', 'desc')
            ->paginate(24)
            ->withQueryString();

        $featuredGames = Game::where('is_active', true)
            ->where('is_featured', true)
            ->limit(6)
            ->get();

        $liveWins = LiveCommunityWin::orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $userFavoriteIds = [];
        if ($request->user()) {
            $userFavoriteIds = UserFavorite::where('user_id', $request->user()->id)
                ->pluck('game_id')
                ->toArray();
        }

        return Inertia::render('Lobby', [
            'games' => $games,
            'featuredGames' => $featuredGames,
            'liveWins' => $liveWins,
            'currentCategory' => $category,
            'search' => $search,
            'userFavoriteIds' => $userFavoriteIds,
        ]);
    }

    /**
     * Launch Game Player Screen.
     */
    public function show(Request $request, string $slug): Response
    {
        $game = Game::where('slug', $slug)->firstOrFail();

        $user = $request->user();

        // If guest visits game player, automatically generate or obtain a guest session
        if (!$user) {
            $guestCode = User::generateUniqueUserCode(true);
            $user = User::create([
                'name' => 'Guest_' . substr($guestCode, -4),
                'email' => strtolower($guestCode) . '@obsidian-guest.local',
                'password' => bcrypt(str()->random(16)),
                'user_code' => $guestCode,
                'game_balance' => 500.00, // Demo guest wallet balance
            ]);
            auth()->login($user);
        }

        $launchResult = $this->nexusService->launchGame(
            $user,
            $game,
            'en'
        );

        $game->increment('play_count');

        return Inertia::render('GamePlayer', [
            'game' => $game,
            'launchUrl' => $launchResult['launch_url'] ?? '',
            'user' => [
                'user_code' => $user->user_code,
                'game_balance' => (float) $user->game_balance,
            ],
        ]);
    }

    /**
     * Interactive mock frame fallback URL.
     */
    public function mockFrame(string $slug)
    {
        $game = Game::where('slug', $slug)->firstOrFail();
        return redirect()->away("https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol={$game->game_code}&lang=en&cur=SC");
    }

    /**
     * Real-time User Balance API Polling.
     */
    public function getBalance(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['game_balance' => 0.00, 'authenticated' => false]);
        }

        $freshUser = User::find($user->id);

        return response()->json([
            'authenticated' => true,
            'user_code' => $freshUser->user_code,
            'game_balance' => (float) $freshUser->game_balance,
            'vip_level' => $freshUser->vip_level,
            'vip_points' => $freshUser->vip_points,
            'is_banned' => (bool) $freshUser->is_banned,
        ]);
    }

    /**
     * Toggle Game Favorites.
     */
    public function toggleFavorite(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $gameId = $request->input('game_id');
        $existing = UserFavorite::where('user_id', $user->id)
            ->where('game_id', $gameId)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['success' => true, 'favorited' => false]);
        } else {
            UserFavorite::create(['user_id' => $user->id, 'game_id' => $gameId]);
            return response()->json(['success' => true, 'favorited' => true]);
        }
    }
}
