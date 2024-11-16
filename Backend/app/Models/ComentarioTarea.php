<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    use HasFactory;

    protected $table = 'comentarioTarea';
    public $incrementing = false;  // Para no usar incremento automático (ya que no hay una columna "id")
    public $timestamps = false;    // Si no estás usando timestamps (created_at, updated_at)

    protected $fillable = [
        'estudiante_idEstudiante',
        'semana_idSemana',
        'comentario',
    ];

    // Definir la clave primaria como combinación de dos columnas
    protected $primaryKey = ['estudiante_idEstudiante', 'semana_idSemana'];
    public $keyType = 'array';  // Indica que la clave primaria es un array (composición de claves)

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_idEstudiante');
    }

    public function semana()
    {
        return $this->belongsTo(Semana::class, 'semana_idSemana');
    }
}
