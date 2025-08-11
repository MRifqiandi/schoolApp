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

    public function overview()
    {
        $classrooms = Classroom::with('students', 'teachers')->get();

        $overview = $classrooms->map(function ($classroom) {
            return [
                'id' => $classroom->id,
                'name' => $classroom->name,
                'teacher_name' => $classroom->teachers->first()->name ?? '-',
                'subject' => $classroom->teachers->first()->subject ?? '-',
                'total_students' => $classroom->students->count(),
                'student_names' => $classroom->students->pluck('name')->toArray(),
            ];
        });

        return response()->json($overview);
    }

}
