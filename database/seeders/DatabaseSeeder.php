<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        $adminCode = User::generateUniqueUserCode(false);
        User::updateOrCreate(
            ['email' => 'admin@obsidian.casino'],
            [
                'name' => 'Obsidian Admin',
                'user_code' => $adminCode,
                'password' => Hash::make('AdminSecret123!'),
                'game_balance' => 10000.00,
                'is_admin' => true,
                'vip_level' => 10,
                'vip_points' => 100000,
            ]
        );

        // 2. Create Demo User
        $demoCode = User::generateUniqueUserCode(false);
        User::updateOrCreate(
            ['email' => 'player@obsidian.casino'],
            [
                'name' => 'Alex Obsidian',
                'user_code' => $demoCode,
                'password' => Hash::make('password'),
                'game_balance' => 250.00,
                'is_admin' => false,
                'vip_level' => 3,
                'vip_points' => 3500,
            ]
        );

        // 3. Seed Stake-style & Aggregated Games Catalog
        $games = [
            // Originals
            [
                'name' => 'Plinko Original',
                'slug' => 'plinko-original',
                'game_code' => 'plinko_orig',
                'provider_code' => 'OBSIDIAN_ORIGINALS',
                'category' => 'originals',
                'cover_image' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 500.00,
                'is_featured' => true,
                'play_count' => 31000,
            ],
            [
                'name' => 'Mines Original',
                'slug' => 'mines-original',
                'game_code' => 'mines_orig',
                'provider_code' => 'OBSIDIAN_ORIGINALS',
                'category' => 'originals',
                'cover_image' => 'https://images.unsplash.com/photo-1614680376593-902f749f7b64?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 500.00,
                'is_featured' => true,
                'play_count' => 28400,
            ],
            [
                'name' => 'Crash Original',
                'slug' => 'crash-original',
                'game_code' => 'crash_orig',
                'provider_code' => 'OBSIDIAN_ORIGINALS',
                'category' => 'originals',
                'cover_image' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 1000.00,
                'is_featured' => true,
                'play_count' => 45000,
            ],
            [
                'name' => 'Dice Original',
                'slug' => 'dice-original',
                'game_code' => 'dice_orig',
                'provider_code' => 'OBSIDIAN_ORIGINALS',
                'category' => 'originals',
                'cover_image' => 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 1000.00,
                'is_featured' => false,
                'play_count' => 19200,
            ],

            // Pragmatic Play Slots & Buy Feature
            [
                'name' => 'Gates of Olympus 1000',
                'slug' => 'gates-of-olympus-1000',
                'game_code' => 'vs20olympgate',
                'provider_code' => 'PRAGMATIC',
                'category' => 'slots',
                'cover_image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 14200,
            ],
            [
                'name' => 'Sweet Bonanza 1000',
                'slug' => 'sweet-bonanza-1000',
                'game_code' => 'vs20sweetbonanza',
                'provider_code' => 'PRAGMATIC',
                'category' => 'buy_feature',
                'cover_image' => 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 125.00,
                'is_featured' => true,
                'play_count' => 9800,
            ],
            [
                'name' => 'Sugar Rush 1000',
                'slug' => 'sugar-rush-1000',
                'game_code' => 'vs20sugarrush',
                'provider_code' => 'PRAGMATIC',
                'category' => 'slots',
                'cover_image' => 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 8450,
            ],
            [
                'name' => 'Starlight Princess 1000',
                'slug' => 'starlight-princess-1000',
                'game_code' => 'vs20starlight',
                'provider_code' => 'PRAGMATIC',
                'category' => 'slots',
                'cover_image' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => false,
                'play_count' => 6100,
            ],
            [
                'name' => 'The Dog House Megaways',
                'slug' => 'the-dog-house-megaways',
                'game_code' => 'vswaysdoghouse',
                'provider_code' => 'PRAGMATIC',
                'category' => 'megaways',
                'cover_image' => 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 12300,
            ],
            [
                'name' => 'Madame Destiny Megaways',
                'slug' => 'madame-destiny-megaways',
                'game_code' => 'vswaysmadame',
                'provider_code' => 'PRAGMATIC',
                'category' => 'megaways',
                'cover_image' => 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => false,
                'play_count' => 7400,
            ],
            [
                'name' => 'Big Bass Splash',
                'slug' => 'big-bass-splash',
                'game_code' => 'vs10txbigbass',
                'provider_code' => 'PRAGMATIC',
                'category' => 'jackpots',
                'cover_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 250.00,
                'is_featured' => false,
                'play_count' => 5200,
            ],
            [
                'name' => 'Wolf Gold Jackpot',
                'slug' => 'wolf-gold-jackpot',
                'game_code' => 'vs25wolfgold',
                'provider_code' => 'PRAGMATIC',
                'category' => 'jackpots',
                'cover_image' => 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.25,
                'max_bet' => 125.00,
                'is_featured' => true,
                'play_count' => 18900,
            ],

            // Hacksaw Gaming
            [
                'name' => 'Wanted Dead or a Wild',
                'slug' => 'wanted-dead-or-a-wild',
                'game_code' => 'hacksaw_wanted',
                'provider_code' => 'HACKSAW',
                'category' => 'buy_feature',
                'cover_image' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 17500,
            ],
            [
                'name' => 'Chaos Crew 2',
                'slug' => 'chaos-crew-2',
                'game_code' => 'hacksaw_chaos2',
                'provider_code' => 'HACKSAW',
                'category' => 'buy_feature',
                'cover_image' => 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 11200,
            ],
            [
                'name' => 'Dork Unit',
                'slug' => 'dork-unit',
                'game_code' => 'hacksaw_dork',
                'provider_code' => 'HACKSAW',
                'category' => 'slots',
                'cover_image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.10,
                'max_bet' => 100.00,
                'is_featured' => false,
                'play_count' => 6700,
            ],

            // Nolimit City & PG Soft
            [
                'name' => 'Mental',
                'slug' => 'mental-nolimit',
                'game_code' => 'nolimit_mental',
                'provider_code' => 'NOLIMIT',
                'category' => 'buy_feature',
                'cover_image' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 21000,
            ],
            [
                'name' => 'Mahjong Ways 2',
                'slug' => 'mahjong-ways-2',
                'game_code' => 'pgsoft_mahjong2',
                'provider_code' => 'PG_SOFT',
                'category' => 'slots',
                'cover_image' => 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
                'min_bet' => 0.20,
                'max_bet' => 100.00,
                'is_featured' => true,
                'play_count' => 33400,
            ],
        ];

        foreach ($games as $gameData) {
            Game::updateOrCreate(
                ['slug' => $gameData['slug']],
                $gameData
            );
        }
    }
}
