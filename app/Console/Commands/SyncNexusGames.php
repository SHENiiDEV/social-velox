<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Services\NexusGgrService;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SyncNexusGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nexus:sync {--provider= : Sync games for specific provider code}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync game catalog from NexusGGR API and purge non-synced games';

    /**
     * Execute the console command.
     */
    public function handle(NexusGgrService $nexusService): int
    {
        $provider = $this->option('provider');
        $this->info('Fetching games from NexusGGR API...');

        $result = $nexusService->fetchGameList($provider);

        if (empty($result['games'])) {
            $this->warn('No games returned from NexusGGR API server.');
            return Command::FAILURE;
        }

        $syncedGameCodes = [];
        $syncedCount = 0;

        foreach ($result['games'] as $g) {
            $gameCode = $g['game_code'] ?? $g['code'] ?? null;
            $name = $g['game_name'] ?? $g['name'] ?? $gameCode;

            if (!$gameCode || !$name) {
                continue;
            }

            $providerCode = strtoupper($g['provider_code'] ?? 'PRAGMATIC');
            $slug = Str::slug($name . '-' . $gameCode);

            Game::updateOrCreate(
                ['game_code' => $gameCode],
                [
                    'name' => $name,
                    'slug' => $slug,
                    'provider_code' => $providerCode,
                    'category' => strtolower($g['category'] ?? 'slots'),
                    'cover_image' => $g['banner'] ?? $g['cover_image'] ?? $g['image'] ?? $g['img'] ?? $g['icon'] ?? $g['url_thumb'] ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                    'min_bet' => $g['min_bet'] ?? 0.20,
                    'max_bet' => $g['max_bet'] ?? 100.00,
                    'is_active' => true,
                ]
            );

            $syncedGameCodes[] = $gameCode;
            $syncedCount++;
        }

        $this->info("Successfully synced {$syncedCount} games.");

        // Delete all remaining games not present in synced catalog
        if (!$provider && !empty($syncedGameCodes)) {
            $deletedCount = Game::whereNotIn('game_code', $syncedGameCodes)->delete();
            $this->info("Purged {$deletedCount} non-synced games from database.");
        }

        return Command::SUCCESS;
    }
}
