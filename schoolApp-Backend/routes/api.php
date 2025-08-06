<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Auth\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});

// routes/api.php
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('summary', [AdminDashboardController::class, 'summary']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('management')->group(function () {

        Route::get('/students', [StudentController::class, 'index']);
        Route::post('/students', [StudentController::class, 'store']);
        Route::get('/students/{id}', [StudentController::class, 'show']);
        Route::put('/students/{id}', [StudentController::class, 'update']);
        Route::delete('/students/{id}', [StudentController::class, 'destroy']);
        Route::get('/students/classroom/{id}', [StudentController::class, 'getByClassroom']);
        Route::get('/student/class-info/{id}', [StudentController::class, 'getClassInfo']);



        Route::get('/teachers', [TeacherController::class, 'index']);
        Route::post('/teachers', [TeacherController::class, 'store']);
        Route::get('/teachers/{id}', [TeacherController::class, 'show']);
        Route::put('/teachers/{teacher}', [TeacherController::class, 'update']);
        Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy']);
        Route::get('/classrooms/{id}/teachers', [TeacherController::class, 'getByClassroom']);



        Route::get('/classrooms', [ClassroomController::class, 'index']);
        Route::post('/classrooms', [ClassroomController::class, 'store']);
        Route::get('/classrooms/{id}', [ClassroomController::class, 'show']);
        Route::put('/classrooms/{classroom}', [ClassroomController::class, 'update']);
        Route::delete('/classrooms/{classroom}', [ClassroomController::class, 'destroy']);

    });

    Route::prefix('teacher')->group(function () {
        Route::get('/classrooms/{id}/students', [ClassroomController::class, 'students']);
        Route::get('/classrooms/{id}/teachers', [ClassroomController::class, 'teachers']);
    });


    // ========= ROUTE UNTUK SISWA =========
    Route::prefix('student')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'student' => auth()->user(),
                'classroom' => auth()->user()->student->classroom ?? null,
                'teachers' => auth()->user()->student->classroom?->teachers ?? [],
            ]);
        });
    });

});
