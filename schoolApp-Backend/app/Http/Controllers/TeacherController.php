<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


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
        $validated = $request->validate([
            'name' => 'required',
            'nip' => 'required|unique:teachers',
            'email' => 'required|email|unique:teachers|unique:users,email',
            'password' => 'required|min:6',
            'subject' => 'required',
            'classroom_id' => 'nullable|exists:classrooms,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'name' => $validated['name'],
            'nip' => $validated['nip'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'classroom_id' => $validated['classroom_id'] ?? null,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Teacher created successfully',
            'teacher' => $teacher
        ], 201);
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
            'email' => 'nullable|email|unique:users,email,' . $teacher->user_id,
            'password' => 'nullable|min:6',
            'subject' => 'required',
            'classroom_id' => 'nullable|exists:classrooms,id',
        ]);


        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $teacher->update([
            'name' => $data['name'],
            'nip' => $data['nip'],
            'subject' => $data['subject'],
            'classroom_id' => $data['classroom_id'] ?? null,
        ]);

        if ($teacher->user_id) {
            $userData = [
                'name' => $data['name'],
                'email' => $data['email'],
            ];
            if (isset($data['password'])) {
                $userData['password'] = $data['password'];
            }
            User::where('id', $teacher->user_id)->update($userData);
        }

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
