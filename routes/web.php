<?php

use Illuminate\Support\Facades\Route;

// Vue Routing with Laravel Routing
Route::view('/login', 'layouts.app')->name('login');
Route::view('/register', 'layouts.app')->name('register');

// Route::get('/', function () {
//     return view('welcome');
// });
Route::any('/{any}', function () {
    return view('layouts.app');
})->where('any', '.*');

// Route::middleware('auth:api')->group(function () {

// });
