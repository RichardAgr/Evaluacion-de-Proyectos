<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    use HasFactory;

    protected $table = 'comentarioTarea';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'estudiante_idEstudiante',
        'semana_idSemana',
        'comentario',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_idEstudiante');
    }

    public function semana()
    {
        return $this->belongsTo(Semana::class, 'semana_idSemana');
    }
}
