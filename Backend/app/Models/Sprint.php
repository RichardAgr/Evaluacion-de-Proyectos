<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{

    protected $table = 'sprint';
    protected $primaryKey = 'idSprint';
    public $timestamps = false; // Cambia a true si usas created_at y updated_at

    protected $fillable = [
        'idPlanificacion', // Relación con la planificación
        'numeroSprint',
        'fechaIni',
        'fechaFin',
        'fechaEntrega',
        'cobro',
        'comentario',
        'nota',
    ];

    public function planificacion()
    {
        return $this->belongsTo(Planificacion::class, 'idPlanificacion');
    }
    public function semanas()
    {
        return $this->hasMany(Semana::class, 'idSprint');
    }

    public function notasprint()
    {
        return $this->hasMany(NotaSprint::class, 'idSprint', 'idSprint');
    }

    public function entregables()
    {
        return $this->hasMany(Entregables::class, 'idSprint', 'idSprint');
    }
    public function notaTareasEstudiante()
    {
        return $this->hasMany(NotaTareasEstudiante::class, 'sprint_idSprint');
    }

}
