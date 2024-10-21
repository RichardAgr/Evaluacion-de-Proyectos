<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;


class Grupo extends Model

{
    use HasFactory;

    protected $table = 'grupo';
    protected $primaryKey = 'idGrupo';

    public function estudiantesGrupos()
    {
        return $this->hasMany(EstudiantesGrupos::class, 'idGrupo');
    }
    public function estudiantes(): HasMany
    {
        return $this->hasMany(EstudiantesGrupos::class, 'idGrupo', 'idGrupo');
    }
    public function docente()
    {
        return $this->belongsTo(Docente::class, 'idDocente');
    }


}