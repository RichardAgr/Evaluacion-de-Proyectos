<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaSprint extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'notaSprint';

    // Deshabilitar timestamps si no usas created_at y updated_at
    public $timestamps = false;

    // Definir que la clave primaria es compuesta
    protected $primaryKey = ['idEmpresa', 'estudiantesempresas_idEstudiante', 'idSprint'];
    public $incrementing = false; // Laravel no puede autoincrementar una clave primaria compuesta

    // Campos que se pueden asignar en masa
    protected $fillable = [
        'idEmpresa',
        'estudiantesempresas_idEstudiante',
        'idSprint',
        'nota',
    ];

    // Relación con la tabla 'estudiantesempresas'
    public function estudiantesEmpresa()
    {
        return $this->belongsTo(EstudiantesEmpresas::class, 'estudiantesempresas_idEstudiante', 'idEstudiante')
                    ->where('idEmpresa', $this->idEmpresa);
    }

    // Relación con la tabla 'sprint'
    public function sprint()
    {
        return $this->belongsTo(Sprint::class, 'idSprint', 'idSprint');
    }
}
