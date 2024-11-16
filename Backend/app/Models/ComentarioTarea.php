<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    use HasFactory;

    protected $table = 'comentarioTarea';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'estudiante_idEstudiante',
        'semana_idSemana',
        'comentario',
    ];
    

    // Definir la clave primaria como combinación de dos columnas
    protected $primaryKey = ['estudiante_idEstudiante', 'semana_idSemana'];
    public $keyType = 'array';

    protected $attributesMap = [
        'idEstudiante' => 'estudiante_idEstudiante',
        'idSemana' => 'semana_idSemana',
    ];
    
    // Sobrescribe el método de asignación masiva
    public function setAttribute($key, $value)
    {
        $key = $this->attributesMap[$key] ?? $key;
        parent::setAttribute($key, $value);
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_idEstudiante');
    }

    public function semana()
    {
        return $this->belongsTo(Semana::class, 'semana_idSemana');
    }
}