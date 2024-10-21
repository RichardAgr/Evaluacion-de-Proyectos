<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Planificacion extends Model
{

    protected $table = 'planificacion';
    protected $primaryKey = 'idPlanificacion';
    public $timestamps = false; // Cambia a true si usas created_at y updated_at
    protected $fillable = [
        'idEmpresa', 
        'aceptada', 
        'fechaEntrega',
        'notaplanificacion',
        'comentariodocente',
    ];
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa');
    }

    public function sprints()
    {
        return $this->hasMany(Sprint::class, 'idPlanificacion');
    }
}
