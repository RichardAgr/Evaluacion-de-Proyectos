<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasApiTokens; // Importante para Sanctum

    protected $table = 'estudiante';
    protected $primaryKey = 'idEstudiante';
    public $timestamps = false;

    protected $fillable = [
        'nombreCuenta',
        'nombreEstudiante',
        'primerApellido',
        'segundoApellido',
        'password',
        'numerodefaltasest',
        'email'
    ];


    protected $hidden = ['password']; // Ocultar el campo de las respuestas JSON

    
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
