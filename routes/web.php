<?php

Route::get('/', 'PagesController@index');
Route::get('/me', 'MeController@show');

Route::get('/login', 'SessionsController@new');
Route::post('/signin', 'SessionsController@store')->name('signin');
