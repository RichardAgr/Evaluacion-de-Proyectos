<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaTareasEstudiante extends Model
{
    use HasFactory;

    protected $table = 'notaTareasEstudiante';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'estudiante_idEstudiante',
        'sprint_idSprint',
        'comentario',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_idEstudiante');
    }

    public function sprint()
    {
        return $this->belongsTo(Sprint::class, 'sprint_idSprint');
    }
}
