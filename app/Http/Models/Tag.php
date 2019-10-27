<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function taggings(){
        return $this->hasMany(Tagging::class);
    }

    public function tag_translations(){
        return $this->hasMany(TagTranslation::class);
    }

    public function posts(){
        return $this->hasManyThrough(Post::class, Tagging::class);
    }
}
