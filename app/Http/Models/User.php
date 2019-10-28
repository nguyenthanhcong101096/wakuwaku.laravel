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

  public function following(){
    return $this->hasManyThrough(User::class, Follow::class, 'user_id', 'id','id','target_user_id')->get();
  }

  public function followers(){
    return $this->hasManyThrough(User::class, Follow::class, 'target_user_id', 'id','id','user_id')->get();
  }

  public function isComment($id){
    return $this->comments->contains('id', $id);
  }

  public function isAuthor($post){
    return $this->posts->contains($post);
  }

  public function isFollow($writer){
    return $this->following()->contains($writer);
  }
}

