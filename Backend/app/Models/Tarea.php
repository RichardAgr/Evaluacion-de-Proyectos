<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Tarea extends Model
{
    protected $table = 'tareas'; // Nombre de la tabla

    // Relación con los estudiantes (muchos a muchos)
    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'tareas_estudiantes', 'idTarea', 'idEstudiante');
    }

    // Relación con los archivos de tarea (uno a muchos)
    public function archivos()
    {
        return $this->hasMany(ArchivoTarea::class, 'idTarea');
    }
}
