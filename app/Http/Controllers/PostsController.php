<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function show(Request $request, $id){
        $post=Post::withPostTranslation()->find($id);
        $authPost = $post->postable->posts()->withPostTranslation()->limit(3)->get();
        return view('posts.show', ['post'=>$post, 'authPost'=>$authPost]);
    }
}
