<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classroom;

class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        $classrooms = [
            ['name' => 'Kelas X IPA 1', 'class_code' => 'XIPA1'],
            ['name' => 'Kelas X IPA 2', 'class_code' => 'XIPA2'],
            ['name' => 'Kelas X IPS 1', 'class_code' => 'XIPS1'],
            ['name' => 'Kelas X IPS 2', 'class_code' => 'XIPS2'],
            ['name' => 'Kelas XI IPA 1', 'class_code' => 'X1IPA1'],
            ['name' => 'Kelas XI IPA 2', 'class_code' => 'X1IPA2'],
            ['name' => 'Kelas XI IPS 1', 'class_code' => 'X1IPS1'],
            ['name' => 'Kelas XI IPS 2', 'class_code' => 'X1IPS2'],
            ['name' => 'Kelas XII Bahasa', 'class_code' => 'XIIBHS'],
            ['name' => 'Kelas XII IPA', 'class_code' => 'XIIIPA'],
        ];

        foreach ($classrooms as $classroom) {
            Classroom::create($classroom);
        }
    }
}
