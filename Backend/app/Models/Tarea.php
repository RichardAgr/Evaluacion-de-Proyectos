<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Tarea extends Model
{
    protected $table = 'tarea'; 
    protected $primaryKey = 'idTarea';
    public $timestamps = false;
 
    protected $fillable = [
        'idSemana',
        'comentario',
        'textoTarea',
        'fechaEntrega',
        'notaTarea'
     
    ];   

    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'tareasestudiantes', 'idTarea', 'idEstudiante');
    }

    public function archivos()
    {
        return $this->hasMany(ArchivoTarea::class, 'idTarea');
    }

    public function semana(){
        return $this->belongsTo(Semana::class, 'idSemana');
    }
}
