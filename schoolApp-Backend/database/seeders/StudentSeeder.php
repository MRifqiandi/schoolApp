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

        for ($i = 1; $i <= 10; $i++) {
            $name = $faker->name();
            $email = "student$i@example.com";

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'student',
            ]);

            Student::create([
                'name' => $name,
                'nisn' => 'STD' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'email' => $email,
                'classroom_id' => rand(1, 3),
                'user_id' => $user->id,
            ]);
        }
    }
}
