<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Tarea extends Model
{
    protected $table = 'tarea'; // Nombre de la tabla
    protected $primaryKey = 'idTarea'; // Especificar la clave primaria

    // Relación con los estudiantes (muchos a muchos)
    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'tareasestudiantes', 'idTarea', 'idEstudiante');
    }

    // Relación con los archivos de tarea (uno a muchos)
    public function archivos()
    {
        return $this->hasMany(ArchivoTarea::class, 'idTarea');
    }
}
