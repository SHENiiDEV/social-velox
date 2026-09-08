<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    public $timestamps = false; // Uses created_at

    protected $fillable = [
        'user_id',
        'user_code',
        'user_name',
        'vip_level',
        'message',
        'created_at',
    ];

    protected $casts = [
        'vip_level' => 'integer',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
