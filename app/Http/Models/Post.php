<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function postable(){
        return $this->morphTo();
    }

    public function authorName(){
        return $this->postable->name;
    }
}
