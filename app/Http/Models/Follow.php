<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function targetUser(){
        return $this->belongsTo(User::class, 'target_user_id');
    }
}
    