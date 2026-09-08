<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveCommunityWin extends Model
{
    use HasFactory;

    public $timestamps = false; // Uses created_at

    protected $fillable = [
        'user_id',
        'user_code',
        'game_name',
        'bet_amount',
        'win_amount',
        'multiplier',
        'created_at',
    ];

    protected $casts = [
        'bet_amount' => 'float',
        'win_amount' => 'float',
        'multiplier' => 'float',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
