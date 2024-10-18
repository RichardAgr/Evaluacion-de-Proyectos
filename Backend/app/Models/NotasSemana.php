<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NotasSemana extends Model
{
    protected $table = 'notassemana';
    protected $primaryKey = 'idNota';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'idSemana',
        'idEstudiante',
        'nota'
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    public function semana()
    {
        return $this->belongsTo(Semana::class, 'idSemana');
    }
}
