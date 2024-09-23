<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Planificacion extends Model
{
    protected $table = 'planificacion'; // Nombre de la tabla
    protected $primaryKey = 'idPlanificacion'; // Clave primaria
    public $timestamps = false; // Cambia a true si usas created_at y updated_at

    protected $fillable = [
        'idEmpresa', // ID de la empresa
        'aceptada', // Estado de aceptación
        'fechaEntrega', // Fecha de entrega
        'notaplanificacion', // Nota de planificación
        'comentariodocente', // Comentarios del docente
    ];
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa', 'idEmpresa');
    }

    public function sprints()
    {
        return $this->hasMany(Sprint::class, 'idPlanificacion', 'idPlanificacion');
    }
}
