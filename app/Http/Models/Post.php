<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function postable(){
        return $this->morphTo();
    }

    public function comments(){
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function authorName(){
        return $this->postable->name;
    }

    public function post_translations(){
        return $this->hasMany(PostTranslation::class);
    }
}
