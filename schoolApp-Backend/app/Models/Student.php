<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Student extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'nisn',
        'email',
        'classroom_id',
    ];

    protected $hidden = ['password'];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
