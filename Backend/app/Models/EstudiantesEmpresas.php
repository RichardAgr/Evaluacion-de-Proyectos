<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudiantesEmpresas extends Model
{
    protected $table = 'estudiantesempresas';
    protected $primaryKey = ['idEmpresa', 'idEstudiante'];
    public $incrementing = false;
    public $timestamps = false;


    public function empresas()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa');
    }


    public function estudiantes()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }
    
    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupo');
    }
}
