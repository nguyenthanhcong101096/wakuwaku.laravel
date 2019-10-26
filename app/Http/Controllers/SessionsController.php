<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionsController extends Controller
{
  public function new(){
    return view('sessions.new');
  }

  public function store(Request $request){
    
  }
}
