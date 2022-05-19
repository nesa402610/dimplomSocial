<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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
    Route::get('/id{ID}', [UserController::class, 'getUser']);
    Route::post('/dialogues', [messageController::class, 'getDialogues']);
    Route::post('/messages', [messageController::class, 'getMessages']);
    Route::post('/sendMessages', [messageController::class, 'sendMessage']);
    Route::get('/geloda', [authController::class, 'loginCheck']);
    Route::prefix('action')->group(function () {
        Route::post('startDialogue', [MessageController::class, 'startDialogue']);
        Route::post('addToFriends', [UserController::class, 'addToFriends']);
        Route::post('createPost', [PostController::class, 'createPost']);
        Route::post('deletePost', [PostController::class, 'deletePost']);
    });
    Route::prefix('profile/update')->group(function () {
        Route::post('status', [UserController::class, 'updateStatus']);
        Route::post('photo', [UserController::class, 'updatePhoto']);
        Route::post('basicInfo', [UserController::class, 'basicInfo']);
    });
    Route::prefix('systems')->group(function (){
        Route::get('useall', [UserController::class, 'getUsers']);
        Route::get('getPosts', [UserController::class, 'getUsers']);

    });
});

Route::post('/creac', [authController::class, 'createAccount']);
Route::post('/auth', [authController::class, 'login']);
