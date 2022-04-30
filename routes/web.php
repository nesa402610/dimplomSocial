<?php

use Illuminate\Support\Facades\Route;

Route::get('/{view?}', function () {
    return view('welcome');
})->where('view', '^((?!api).)*$');
