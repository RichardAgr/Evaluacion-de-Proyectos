<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TareaEstudiante extends Model
{
    protected $table = 'tareasestudiantes';
    protected $primaryKey = ['idEstudiante', 'idTarea']; 
    public $incrementing = false;
    public $timestamps = false;

  
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'idTarea');
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }
}
