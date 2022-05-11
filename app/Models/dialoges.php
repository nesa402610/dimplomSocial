<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dialoges extends Model
{
    use HasFactory;

    protected $fillable = [
        'dialogue_user_id',
        'dialogue_acceptor_id'
    ];
    public $timestamps = true;

    public function acceptor()
    {
        return $this->belongsTo(User::class, 'dialogue_acceptor_id');
    }
}
