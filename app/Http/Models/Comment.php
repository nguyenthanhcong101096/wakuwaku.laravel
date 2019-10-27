<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function commentable(){
        return $this->morphTo();
    }

    public function userable(){
        return $this->morphTo();
    }
}
