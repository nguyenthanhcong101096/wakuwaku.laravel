<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Models\Post;
use App\Http\Models\User;
use App\Http\Models\Tag;
use App\Http\Models\TagTranslation;
use App\Http\Models\Comment;
use App\Http\Models\PostTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Decorators\UserDecorator;
use App\Http\Queries\PostQuery;

class PagesController extends Controller
{
  public function index(){
    // $user = User::first()->decorator(UserDecorator::class);
    // $users=User::all()->decorator(UserDecorator::class);
    // $posts = Post::all();
    // $post_query=$posts->queries(PostQuery::class);
    $posts=Post::withPostTranslation('ja');
    return view('pages.index', ['posts'=>$posts]);
  }

  public function page_404(){
    return view('errors.404');
  }
}
