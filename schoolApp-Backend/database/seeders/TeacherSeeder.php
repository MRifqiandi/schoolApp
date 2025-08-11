<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $classroomIds = range(1, 10); // semua kelas

        // Setiap kelas dapat 1 guru dulu
        foreach ($classroomIds as $classroomId) {
            $name = $faker->name();
            $email = "teacher_class{$classroomId}@example.com";

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'teacher',
            ]);

            Teacher::create([
                'name' => $name,
                'nip' => 'TCH' . str_pad($classroomId, 4, '0', STR_PAD_LEFT),
                'email' => $email,
                'subject' => $faker->randomElement(['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris']),
                'classroom_id' => $classroomId,
                'user_id' => $user->id,
            ]);
        }

        // Tambah guru random supaya ada kelas dengan > 1 guru
        for ($i = 11; $i <= 15; $i++) {
            $name = $faker->name();
            $email = "teacher$i@example.com";

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'teacher',
            ]);

            Teacher::create([
                'name' => $name,
                'nip' => 'TCH' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'email' => $email,
                'subject' => $faker->randomElement(['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris']),
                'classroom_id' => $faker->randomElement($classroomIds),
                'user_id' => $user->id,
            ]);
        }
    }

}
