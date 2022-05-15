<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class friend extends Model {
    use HasFactory;

    protected $fillable = ['user_id'];

    public function friends() {
        return $this->belongsToMany(User::class);
    }

}
