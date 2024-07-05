<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UserInfoController;
use App\Http\Controllers\App\LocationController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// , 'role:super-admin|admin'
Route::group(['middleware' => ['auth:sanctum']], function () {
    // user
    Route::apiResource('user', UserController::class)->only(['index', 'show']);
    Route::post('/update-user-role', [UserController::class, 'updateUserRole'])->name('user.update-role');
    Route::apiResource('user-info', UserInfoController::class)->only(['index', 'store', 'show']);
});

// non protected route 
Route::apiResource('location', LocationController::class)->only(['index']);
