<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Models\Post;
use Illuminate\Http\Request;

class PagesController extends Controller
{
  public function index(){
    $posts = Post::get();
    $post = $posts->find(1)->getName();
    dd($post);
    return view('pages.index');
  }
}
