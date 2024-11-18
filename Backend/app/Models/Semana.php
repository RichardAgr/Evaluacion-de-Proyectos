<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semana extends Model
{
    protected $table = 'semana';
    protected $primaryKey = 'idSemana';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'idSprint',
        'numeroSemana',
        'fechaIni',
        'fechaFin',
    ];

    public function tareas()
    {
        return $this->hasMany(Tarea::class, 'idSemana');
    }

    public function sprint()
    {
        return $this->belongsTo(Sprint::class, 'idSprint');
    }

    public function comentarioTarea()
    {
        return $this->hasMany(ComentarioTarea::class, 'idSemana');
    }
}
