<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Classroom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index()
    {
        Student::with('classroom', 'teacher')
            ->select('id', 'name', 'nisn', 'classroom_id', 'teacher_id')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'nisn' => 'required|unique:students',
            'email' => 'required|email|unique:students|unique:users,email',
            'password' => 'required|min:6',
            'classroom_id' => 'required|exists:classrooms,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'student',
        ]);

        $student = Student::create([
            'name' => $validated['name'],
            'nisn' => $validated['nisn'],
            'email' => $validated['email'],
            'classroom_id' => $validated['classroom_id'],
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Siswa berhasil ditambahkan',
            'student' => $student
        ], 201);

    }

    public function show($id)
    {
        $student = Student::with('classroom')->find($id);
        if (!$student) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'name' => 'required',
            'nisn' => 'required|unique:students,nisn,' . $student->id,
            'email' => 'required|email|unique:students,email,' . $student->id,
            'classroom_id' => 'required|exists:classrooms,id',
        ]);

        $student->update($validated);

        if ($student->user_id) {
            $user = User::find($student->user_id);
            if ($user) {
                $user->update([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ]);
            }
        }

        return response()->json(['message' => 'Siswa berhasil diperbarui', 'student' => $student]);
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }
        if ($student->user_id) {
            User::where('id', $student->user_id)->delete();
        }

        $student->delete();
        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }

    public function getByClassroom($classroom_id)
    {
        $students = Student::where('classroom_id', $classroom_id)->with('classroom')->get();

        if ($students->isEmpty()) {
            return response()->json(['message' => 'Tidak ada siswa dalam kelas ini'], 404);
        }

        return response()->json($students);
    }


}
