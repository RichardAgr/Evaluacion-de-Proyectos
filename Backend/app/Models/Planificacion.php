<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planificacion extends Model
{
    protected $table = 'planificacion';
    protected $primaryKey = 'IDPLANIFICACION';
    protected $fillable = [
        'IDPLANIFICACION', 
        'IDEMPRESA', 
        'ACEPTADA', 
        'FECHAENTREGA', 
        'NOTAPLANIFICACION', 
        'COMENTARIODOCENTE'
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
