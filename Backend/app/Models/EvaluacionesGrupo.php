<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluacionesGrupo extends Model
{
    protected $table = 'evaluacionesgrupo';
    protected $primaryKey = 'idEvaluacionesGrupo';
    public $timestamps = false;
    protected $fillable = [
        'idGrupo',
        'fechaEvaluacion',
    ];

    // * Relación con la tabla grupo (pertenece a)
    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupo', 'idGrupo');
    }
    
}