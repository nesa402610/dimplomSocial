<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
    use HasFactory;

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function acceptor()
    {
        return $this->belongsTo(User::class, 'acceptor_id');
    }
}
