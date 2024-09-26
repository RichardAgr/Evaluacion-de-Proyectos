<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiante';
    protected $primaryKey = 'idEstudiante';
    public $timestamps = false;

    // FALTA AÑADIR CLASE GRUPO PARA VINCULAR EMPRESA CON DOCENTE Y SABER QUE EMPRESAS PERTENECEN A QUE DOCENTE 
    // Eso para HU listar grupos

    // public function grupos()
    // {
    //     return $this->belongsToMany(Grupo::class, 'estudiantesgrupos', 'idEstudiante', 'idGrupo');
    // }


    //metodo que deberia haber en grupo para comunicarse con el docente
    // public function docente()
    // {
    //     return $this->belongsTo(Docente::class, 'idDocente');
    // }


    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'estudiantes_grupos', 'idEstudiante', 'idGrupo');
    }
}

    
