<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Post;

class PostsController extends Controller
{
    public function show(Request $request, $id){
        $post=Post::withPostTranslation()->find($id);
        dd($post);
        return view('posts.show', ['post'=>$post]);
    }
}
