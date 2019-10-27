<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class PagesController extends Controller
{
  public function index(){
    return view('pages.index');
  }

  public function page_404(){
    return view('errors.404');
  }
}
