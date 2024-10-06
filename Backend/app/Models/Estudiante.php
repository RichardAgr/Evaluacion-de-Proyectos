<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Estudiante extends Model
{
    protected $table = 'estudiante';
    protected $primaryKey = 'idEstudiante';
    public $timestamps = false;
    protected $fillable = [
        'nombreCuenta',
        'nombreEstudiante',
        'primerApellido',
        'segundoApellido',
        'contrasena',
        'rol',
        'numerodefaltasest',
    ];



    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'estudiantesgrupos', 'idEstudiante', 'idGrupo');
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'idDocente');
    }

    public function tareas()
    {
        return $this->belongsToMany(Tarea::class, 'tareasestudiantes', 'idEstudiante', 'idTarea');
    }

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'estudiantesempresas', 'idEmpresa', 'idEstudiante');
    }
}

    
