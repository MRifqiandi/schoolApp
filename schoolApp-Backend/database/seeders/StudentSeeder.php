<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $classroomIds = range(1, 10); // semua kelas
        $studentNumber = 1;

        foreach ($classroomIds as $classroomId) {
            // misal 5 murid per kelas
            for ($j = 1; $j <= 5; $j++) {
                $name = $faker->name();
                $email = "student{$studentNumber}@example.com";

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make('password'),
                    'role' => 'student',
                ]);

                Student::create([
                    'name' => $name,
                    'nisn' => 'STD' . str_pad($studentNumber, 4, '0', STR_PAD_LEFT),
                    'email' => $email,
                    'classroom_id' => $classroomId,
                    'user_id' => $user->id,
                ]);
                $studentNumber++;
            }
        }
    }

}
