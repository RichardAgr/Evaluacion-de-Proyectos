<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresa';
    protected $primaryKey = 'idEmpresa';
    public $timestamps = false;

    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'estudiantesempresas', 'idEmpresa', 'idEstudiante');
    }
    public function planificaciones()
    {
        return $this->hasMany(Planificacion::class, 'idEmpresa');
    }
}
