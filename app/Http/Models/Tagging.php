<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Tagging extends Model
{
    public function tag(){
        return $this->belongsTo(Tag::class);
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }
}
