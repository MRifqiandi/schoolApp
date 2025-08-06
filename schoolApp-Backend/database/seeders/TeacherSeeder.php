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

        for ($i = 1; $i <= 10; $i++) {
            $name = $faker->name();
            $email = "teacher$i@example.com";

            // Buat user dulu
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'teacher',
            ]);

            // Buat teacher
            Teacher::create([
                'name' => $name,
                'nip' => 'TCH' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'email' => $email,
                'subject' => $faker->randomElement(['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris']),
                'classroom_id' => rand(1, 3), // pastikan classroom 1-3 ada
            ]);
        }
    }
}
