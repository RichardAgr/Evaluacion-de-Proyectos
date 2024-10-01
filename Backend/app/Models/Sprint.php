<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    
    protected $table = 'sprint'; // Nombre de la tabla
    protected $primaryKey = 'idSprint'; // Asegúrate de que este sea el nombre de la columna de clave primaria
    public $timestamps = false; // Cambia a true si usas created_at y updated_at

    protected $fillable = [
        'idPlanificacion', // Relación con la planificación
        'fechaIni',
        'fechaFin',
        'cobro',
        'notasprint',
        'comentariodocente',
        'entregables',
        'fechaEntrega'
    ];

    public function planificacion()
    {
        return $this->belongsTo(Planificacion::class, 'idPlanificacion');
    }
    public function semanas(): HasMany
    {
        return $this->hasMany(Semana::class, 'idSprint', 'idSprint');
    }
}
