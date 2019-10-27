<?php

namespace App\Http\Presenters;

use App\Http\Models\Post;

class PostsPresenter {
  public function randomAdvertisings(){
    return Post::withPostTranslation()->withCategory('advertising');
  }

  public function latestFourPosts(){
    return Post::withPostTranslation()->withNotCategory('advertising')->limit(4)->get();
  }

  public function fourAreaInformation(){
    return Post::withArea()->limit(4)->get();
  }
}
