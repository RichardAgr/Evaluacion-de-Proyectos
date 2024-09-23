<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    protected $table = 'sprint';

    public function planificacion()
    {
        return $this->belongsTo(Planificacion::class, 'idPlanificacion');
    }
}
