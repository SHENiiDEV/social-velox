<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonusClaim extends Model
{
    use HasFactory;

    public $timestamps = false; // Uses created_at

    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'details',
        'created_at',
    ];

    protected $casts = [
        'amount' => 'float',
        'details' => 'array',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
