<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudiantesEmpresas extends Model
{
    protected $table = 'estudiantesempresas';
    protected $primaryKey = ['idEmpresa', 'idEstudiante'];  // Llave primaria compuesta
    protected $fillable =['idEmpresa', 'idEstudiante'];
    public $incrementing = false;
    public $timestamps = false;

    // Relaciones
        public function empresas()
        {
            return $this->belongsToMany(Empresa::class, 'estudiantesempresas', 'idEstudiante', 'idEmpresa');
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
