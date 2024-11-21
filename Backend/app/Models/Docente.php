<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;
    use HasApiTokens; // Importante para Sanctum

    protected $table = 'docente'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'idDocente';
    protected $fillable = [
        'nombreCuenta',
        'nombreDocente',
        'primerApellido',
        'segundoApellido',
        'password',
        'email'
    ];

    protected $hidden = ['password']; // Ocultar el campo de las respuestas JSON


    public function grupos()
    {
        return $this->hasMany(Grupo::class, 'idDocente');
    }

    public function empresas()
    {
        return $this->hasManyThrough(
            Empresa::class,           
            Estudiante::class,        
            'idEstudiante',           
            'idEmpresa',              
            'idDocente',             
            'idEstudiante'           
        )
        ->distinct();                 
    }

}
