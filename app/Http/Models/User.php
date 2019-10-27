<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
  public function posts(){
    return $this->morphMany(Post::class, 'postable');
  }

  public function comments(){
    return $this->morphMany(Comment::Class, 'userable');
  }

  public function post_translations(){
    return $this->morphMany(PostTranslation::Class, 'authorable');    
  }
}

