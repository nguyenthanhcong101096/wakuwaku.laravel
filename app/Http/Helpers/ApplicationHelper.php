<?php

function currentUser(){
  if(userSignIn()){
    return auth()->user();
  } else {
    return null;
  }
}

function userSignIn(){
  return auth()->check() ? true : false;
}
