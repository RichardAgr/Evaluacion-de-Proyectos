<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaSprint extends Model
{
    use HasFactory;

    protected $table = 'notaSprint';
    protected $primaryKey = 'idEvaluacionsemanal';
    public $timestamps = false;

    protected $fillable = [
        'idEmpresa',
        'idEstudiante',
        'idSprint',
        'nota',
        'comentario',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa');
    }

    public function sprint()
    {
        return $this->belongsTo(Sprint::class, 'idSprint');
    }
}
