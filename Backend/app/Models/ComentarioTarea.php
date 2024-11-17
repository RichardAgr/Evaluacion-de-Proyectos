<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    protected $table = 'comentarioTarea';
    protected $primaryKey = ['idEstudiante', 'idSemana'];

    /**
     * No es autoincremental por tener llave primaria compuesta
     */
    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'idEstudiante',
        'idSemana',
        'comentario',
    ];

    /**
     * obtiene el estudiante que tiene el comentario
     */
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    /**
     * obtiene la semana que tiene el comentario
     */
    public function semana()
    {
        return $this->belongsTo(Semana::class, 'idSemana');
    }
}