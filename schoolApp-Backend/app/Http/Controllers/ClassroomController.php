<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::all();
        return response()->json($classrooms);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'class_code' => 'required|string',
        ]);

        $classroom = Classroom::create($validated);

        return response()->json(['message' => 'Classroom created successfully.', 'data' => $classroom], 201);
    }

    public function show($id)
    {
        $classroom = Classroom::findOrFail($id);
        return response()->json($classroom);
    }

    public function update(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'class_code' => 'required|string',
        ]);

        $classroom->update($validated);

        return response()->json(['message' => 'Classroom updated successfully.', 'data' => $classroom]);
    }

    public function destroy(Classroom $classroom)
    {
        $classroom->delete();
        return response()->json(['message' => 'Classroom deleted successfully.']);
    }

    public function students($id)
    {
        $classroom = Classroom::with('students')->findOrFail($id);
        return response()->json($classroom);
    }

    public function teachers($id)
    {
        $classroom = Classroom::with('teachers')->findOrFail($id);
        return response()->json($classroom);
    }

    public function listStudentsByClassroom()
    {

        $classrooms = Classroom::with('students')->get();

        $result = $classrooms->map(function ($classroom) {
            return [
                'class_id' => $classroom->id,
                'class_name' => $classroom->name,
                'students' => $classroom->students->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->name,
                        'nisn' => $student->nisn,
                    ];
                }),
            ];
        });

        return response()->json($result);
    }

    public function listTeachersByClassroom()
    {
        $classrooms = Classroom::with('teachers')->get();

        $result = $classrooms->map(function ($classroom) {
            return [
                'class_id' => $classroom->id,
                'class_name' => $classroom->name,
                'teachers' => $classroom->teachers->map(function ($teacher) {
                    return [
                        'id' => $teacher->id,
                        'name' => $teacher->name,
                        'subject' => $teacher->subject,
                    ];
                }),
            ];
        });

        return response()->json($result);
    }


    public function combinedOverview()
    {
        $classrooms = Classroom::with(['students', 'teachers'])->get();

        $overview = $classrooms->map(function ($classroom) {
            return [
                'class_id' => $classroom->id,
                'class_name' => $classroom->name,
                'teachers' => $classroom->teachers->map(fn($teacher) => ['id' => $teacher->id, 'name' => $teacher->name, 'subject' => $teacher->subject]),
                'students' => $classroom->students->map(fn($student) => ['id' => $student->id, 'name' => $student->name, 'nisn' => $student->nisn]),
            ];
        });

        return response()->json($overview);
    }


}
