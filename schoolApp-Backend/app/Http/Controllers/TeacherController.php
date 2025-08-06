<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\Classroom;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with('classroom')->get();
        return response()->json($teachers);
    }

    public function create()
    {
        $classrooms = Classroom::all();
        return response()->json($classrooms);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'nip' => 'required|unique:teachers',
            'email' => 'nullable|email',
            'subject' => 'required',
            'classroom_id' => 'nullable',
        ]);

        $teacher = Teacher::create($data);
        return response()->json(['message' => 'Teacher created successfully', 'teacher' => $teacher], 201);
    }

    public function edit(Teacher $teacher)
    {
        $classrooms = Classroom::all();
        return response()->json([
            'teacher' => $teacher,
            'classrooms' => $classrooms,
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'name' => 'required',
            'nip' => 'required|unique:teachers,nip,' . $teacher->id,
            'email' => 'nullable|email',
            'subject' => 'required',
            'classroom_id' => 'nullable',
        ]);

        $teacher->update($data);
        return response()->json(['message' => 'Teacher updated successfully', 'teacher' => $teacher]);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response()->json(['message' => 'Teacher deleted successfully']);
    }

    public function getByClassroom($id)
    {
        $classroom = Classroom::find($id);

        if (!$classroom) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        $teachers = Teacher::with('classroom')->where('classroom_id', $id)->get();

        return response()->json(['teachers' => $teachers]);
    }


}
