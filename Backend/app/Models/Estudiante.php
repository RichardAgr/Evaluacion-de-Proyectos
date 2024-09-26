<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiante';
    protected $primaryKey = 'idEstudiante';
    public $timestamps = false;

    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'estudiantes_grupos', 'idEstudiante', 'idGrupo');
    }
    public function tareas()
    {
        return $this->belongsToMany(Tarea::class, 'tareasestudiantes', 'idEstudiante', 'idTarea');
    }
}

    
