<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\User;
use Illuminate\Support\Facades\Auth;

class SessionsController extends Controller
{

  public function __construct(){
    $this->middleware('guest')->except('destroy');
  }
  
  public function new(){
    return view('sessions.new');
  }

  public function store(Request $request){
    
  }

  public function dangnhap(){
    $user = User::first();
    Auth::guard('web')->login($user);
    return redirect('/');
  }
}
