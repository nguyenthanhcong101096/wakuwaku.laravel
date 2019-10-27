<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Models\Post;
use App\Http\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Decorators\UserDecorator;

class PagesController extends Controller
{
  public function index(){
    // $user = User::first()->decorator(UserDecorator::class);
    // $users=User::all()->decorator(UserDecorator::class);
    $posts = User::find(1)->posts;
    return view('pages.index', ['posts'=>$posts]);
  }

  public function page_404(){
    return view('errors.404');
  }
}
