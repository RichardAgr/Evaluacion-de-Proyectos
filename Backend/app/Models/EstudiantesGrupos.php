<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudiantesGrupos extends Model
{
    protected $table = 'estudiantesgrupos';
    protected $primaryKey = ['idEstudiante', 'idGrupo'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = ['idEstudiante', 'idGrupo']; 

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'idGrupo');
    }
}