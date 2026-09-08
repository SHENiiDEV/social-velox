<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameTransaction extends Model
{
    use HasFactory;

    public $timestamps = false; // Uses created_at timestamp

    protected $fillable = [
        'user_id',
        'game_id',
        'user_code',
        'txn_id',
        'txn_id_v2',
        'txn_type',
        'round_id',
        'bet_amount',
        'win_amount',
        'before_balance',
        'after_balance',
        'raw_payload',
        'created_at',
    ];

    protected $casts = [
        'bet_amount' => 'float',
        'win_amount' => 'float',
        'before_balance' => 'float',
        'after_balance' => 'float',
        'raw_payload' => 'array',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
