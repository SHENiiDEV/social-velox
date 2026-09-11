<?php

namespace Tests\Feature;

use App\Models\GameTransaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GoldApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'services.nexus.agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
            'services.nexus_ggr.agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
        ]);
    }

    public function test_gold_api_rejects_invalid_secret(): void
    {
        $response = $this->postJson('/gold_api', [
            'method' => 'user_balance',
            'agent_secret' => 'WRONG_SECRET',
        ]);

        $response->assertStatus(200)
            ->assertJson(['status' => 0, 'msg' => 'INVALID_SECRET']);
    }

    public function test_gold_api_user_balance_success(): void
    {
        $user = User::create([
            'name' => 'Test Player',
            'email' => 'test@obsidian.casino',
            'user_code' => 'RP_TEST01',
            'password' => bcrypt('password'),
            'game_balance' => 250.50,
        ]);

        $response = $this->postJson('/gold_api', [
            'method' => 'user_balance',
            'agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
            'user_code' => 'RP_TEST01',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 1,
                'user_balance' => 250.50,
            ]);
    }

    public function test_gold_api_user_balance_rejects_banned_user(): void
    {
        $user = User::create([
            'name' => 'Banned Player',
            'email' => 'banned@obsidian.casino',
            'user_code' => 'RP_BANNED',
            'password' => bcrypt('password'),
            'game_balance' => 100.00,
            'is_banned' => true,
        ]);

        $response = $this->postJson('/gold_api', [
            'method' => 'user_balance',
            'agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
            'user_code' => 'RP_BANNED',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 0,
                'user_balance' => 0.00,
                'msg' => 'INTERNAL_ERROR',
            ]);
    }

    public function test_gold_api_transaction_debit_credit_success(): void
    {
        $user = User::create([
            'name' => 'Spin Player',
            'email' => 'spin@obsidian.casino',
            'user_code' => 'RP_SPIN01',
            'password' => bcrypt('password'),
            'game_balance' => 100.00,
        ]);

        $payload = [
            'method' => 'transaction',
            'agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
            'user_code' => 'RP_SPIN01',
            'game_code' => 'vs20olympgate',
            'txn_type' => 'debit_credit',
            'txn_id' => 'TX_1001',
            'txn_id_v2' => 'TXV2_1001',
            'round_id' => 'RND_5001',
            'slot' => [
                'bet_money' => 2.00,
                'win_money' => 15.50,
            ],
        ];

        $response = $this->postJson('/gold_api', $payload);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 1,
                'user_balance' => 113.50,
                'msg' => 'SUCCESS',
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'game_balance' => 113.50,
        ]);

        $this->assertDatabaseHas('game_transactions', [
            'user_code' => 'RP_SPIN01',
            'txn_id_v2' => 'TXV2_1001',
            'bet_amount' => 2.00,
            'win_amount' => 15.50,
            'after_balance' => 113.50,
        ]);
    }

    public function test_gold_api_transaction_idempotency_skip(): void
    {
        $user = User::create([
            'name' => 'Idem Player',
            'email' => 'idem@obsidian.casino',
            'user_code' => 'RP_IDEM01',
            'password' => bcrypt('password'),
            'game_balance' => 200.00,
        ]);

        GameTransaction::create([
            'user_id' => $user->id,
            'user_code' => 'RP_IDEM01',
            'txn_id' => 'TX_EXISTING',
            'txn_id_v2' => 'TXV2_EXISTING',
            'txn_type' => 'debit_credit',
            'round_id' => 'RND_9999',
            'bet_amount' => 5.00,
            'win_amount' => 0.00,
            'before_balance' => 200.00,
            'after_balance' => 195.00,
        ]);

        $payload = [
            'method' => 'transaction',
            'agent_secret' => '0fbfd24390fac179e21e1ccee9d243ff',
            'user_code' => 'RP_IDEM01',
            'txn_id_v2' => 'TXV2_EXISTING',
            'bet_money' => 5.00,
        ];

        $response = $this->postJson('/gold_api', $payload);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 1,
                'user_balance' => 195.00,
                'msg' => 'DUPLICATE_TRANSACTION_SKIPPED',
            ]);
    }
}
