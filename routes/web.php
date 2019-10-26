<?php

Route::get('/', 'PagesController@index');
Route::get('/me', 'MeController@show');

Route::get('/login', 'SessionsController@new')->name('sessions.login');
Route::get('/dangnhap', 'SessionsController@dangnhap');
Route::post('/signin', 'SessionsController@store')->name('sessions.signin');
