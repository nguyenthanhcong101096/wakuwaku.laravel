<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class PostTranslation extends Model
{
    public function authorable(){
        return $this->morphTo();
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }
}
