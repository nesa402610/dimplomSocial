<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\messageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/dialogues', [messageController::class, 'getDialogues']);
    Route::post('/messages', [messageController::class, 'getMessages']);
    Route::post('/sendMessages', [messageController::class, 'sendMessage']);
    Route::post('/loginCheck', [authController::class, 'loginCheck']);
});

Route::post('/creac', [authController::class, 'createAccount']);
Route::post('/auth', [authController::class, 'login']);
