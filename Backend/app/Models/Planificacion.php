<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planificacion extends Model
{
    protected $table = 'planificacion';

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa', 'idEmpresa');
    }

    public function sprints()
    {
        return $this->hasMany(Sprint::class, 'idPlanificacion', 'idPlanificacion');
    }
}

