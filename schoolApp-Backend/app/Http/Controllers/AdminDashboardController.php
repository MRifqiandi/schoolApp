<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Classroom;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function summary(): JsonResponse
    {
        $students = Student::count();
        $teachers = Teacher::count();
        $classrooms = Classroom::count();

        return response()->json([
            'students' => $students,
            'teachers' => $teachers,
            'classrooms' => $classrooms,
        ]);
    }
}
