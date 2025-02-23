<?php

use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UserInfoController;
use App\Http\Controllers\App\LocationController;
use App\Http\Controllers\Bio\BioController;
use App\Http\Controllers\App\BioController
as AppBioController;
use App\Http\Controllers\Bio\EducationSectionController;
use App\Http\Controllers\Bio\ExpectedPartnerController;
use App\Http\Controllers\Bio\FamilyInfoSectionController;
use App\Http\Controllers\Bio\FilledMarksController;
use App\Http\Controllers\Bio\GeneralSectionController;
use App\Http\Controllers\Bio\HiddenInfoController;
use App\Http\Controllers\Bio\LocationSectionController;
use App\Http\Controllers\Bio\MarriageInfoController;
use App\Http\Controllers\Bio\PersonalDetailsController;
use App\Http\Controllers\Bio\ProfessionSectionController;
use App\Http\Controllers\Bio\ReligiousActivityController;
use App\Http\Controllers\Bio\ShortBioController;
use App\Http\Controllers\Bio\UserRecordController;
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

  // Bio 
  Route::apiResource('bio', BioController::class)->only(['index', 'store',  'update', 'destroy'])->where(['bio' => '[0-9]+']);

  // update statuses and types 
  Route::patch('bio/update-statuses-types', [BioController::class, 'updateStatusesAndTypes'])->name('bio.update-statuses-types');

  // Sort Bio 
  Route::apiResource('bio/short', ShortBioController::class)->only(['store',  'update']);

  // Bio general
  Route::apiResource('bio/general', GeneralSectionController::class)->only(['store',  'update']);

  // Bio location
  Route::apiResource('bio/location', LocationSectionController::class)->only(['store',  'update']);

  // Bio education
  Route::apiResource('bio/education', EducationSectionController::class)->only(['store',  'update']);

  // Bio personal-details
  Route::apiResource('bio/personal-details', PersonalDetailsController::class)->only(['store',  'update']);

  // Bio family-info
  Route::apiResource('bio/family-info', FamilyInfoSectionController::class)->only(['store',  'update']);

  // Bio profession
  Route::apiResource('bio/profession', ProfessionSectionController::class)->only(['store',  'update']);

  // Bio religious activity
  Route::apiResource('bio/religious-activities', ReligiousActivityController::class)->only(['store',  'update']);

  // Bio marriage info
  Route::apiResource('bio/marriage-info', MarriageInfoController::class)->only(['store',  'update']);

  // Bio expected partner
  Route::apiResource('bio/expected-partner', ExpectedPartnerController::class)->only(['store',  'update']);

  // Bio expected partner
  Route::apiResource('bio/hidden-info', HiddenInfoController::class)->only(['store',  'update']);

  // Bio approve request.
  Route::get('bio/approve-bio-request', [BioController::class, 'approveRequest']);

  // Bio Tags
  Route::apiResource('tag', TagController::class)->only(['index', 'store', 'show']);

  // filled marks 
  Route::apiResource('filled-marks', FilledMarksController::class)->only(['index', 'store', 'show']);

  // Route to get the filled marks data for the logged-in user
  Route::get('/user-bio/filled-marks', [FilledMarksController::class, 'userFilledMarks'])->name('user.filled-marks');

  // Bio user records 
  Route::get('bio/{section}/user-bio-record', [UserRecordController::class, 'getBioUserRecord'])
    ->where('section', 'general|location|education|personal-info|family|profession|religious-activities|marital-info|expected-partner|hidden-info|filled-marks');

  // Short bio user record.
  Route::get('bio/user-record', [BioController::class, 'userRecord']);
});

// NON PROTECTED ROUTES
// location route
Route::apiResource('location', LocationController::class)->only(['index']);

// Bio 
Route::apiResource('bio/public', AppBioController::class)->only(['index', 'show']);