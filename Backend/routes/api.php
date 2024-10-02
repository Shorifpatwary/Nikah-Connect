<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UserInfoController;
use App\Http\Controllers\App\LocationController;
use App\Http\Controllers\Bio\BioController;
use App\Http\Controllers\Bio\FilledMarksController;
use App\Http\Controllers\Bio\GeneralSectionController;
use App\Http\Controllers\Bio\LocationSectionController;
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
  // Bio Tags
  Route::apiResource('bio', BioController::class);
  // Bio general
  Route::apiResource('bio/general', GeneralSectionController::class)->only(['store', 'show', 'update']);
  // Bio location
  Route::apiResource('bio/location', LocationSectionController::class)->only(['store', 'show', 'update']);
  // Bio Tags
  Route::apiResource('tag', TagController::class)->only(['index', 'store', 'show']);
  // filled marks 
  Route::apiResource('filled-marks', FilledMarksController::class)->only(['index', 'store', 'show']);
  // Route to get the filled marks data for the logged-in user
  Route::get('/user-bio/filled-marks', [FilledMarksController::class, 'userFilledMarks'])->name('user.filled-marks');
});

// non protected route 
Route::apiResource('location', LocationController::class)->only(['index']);