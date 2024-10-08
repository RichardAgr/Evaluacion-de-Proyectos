<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $table = 'docente'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'idDocente';
    protected $fillable = [
        'nombreCuenta',
        'nombreDocente',
        'primerApellido',
        'segundoApellido',
        'contraseña',
    ];

    public function grupos()
    {
        return $this->hasMany(Grupo::class, 'idDocente');
    }
}
