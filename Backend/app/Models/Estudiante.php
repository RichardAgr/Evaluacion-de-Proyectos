<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'numerodefaltasest'
    ];

    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'estudiantesgrupos', 'idEstudiante', 'idGrupo')
                    ->withPivot('disponibleEstudiante');
    }

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'estudiantesempresas', 'idEstudiante', 'idEmpresa');
    }
}
