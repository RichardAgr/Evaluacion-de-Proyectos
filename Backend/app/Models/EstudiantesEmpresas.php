<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudiantesEmpresas extends Model
{
    protected $table = 'estudiantesempresas';
    protected $primaryKey = ['idEmpresa', 'idEstudiante'];  // Llave primaria compuesta
    public $incrementing = false;
    public $timestamps = false;

    // Relaciones
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa');
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }
    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupo');
    }
}
