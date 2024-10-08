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
        'fechaIni',
        'fechaFin',
        'cobro',
        'fechaEntrega',
        'entregables',
        'notasprint',
        'comentariodocente',  
    ];

    public function planificacion()
    {
        return $this->belongsTo(Planificacion::class, 'idPlanificacion');
    }
    public function semanas()
    {
        return $this->hasMany(Semana::class, 'idSprint');
    }
}
