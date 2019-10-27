<?php
Route::get('/',   'PagesController@index');
Route::get('/me', 'MeController@show');

Route::get('/login',     'SessionsController@new')->name('sessions.login');
Route::get('/dangnhap',  'SessionsController@dangnhap');
Route::post('/signin',   'SessionsController@store')->name('sessions.signin');
Route::get('/not_found', 'PagesController@page_404')->name('not_found');

Route::get('/articles/{id}', 'PostsController@show');
