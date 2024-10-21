<?php

namespace App\Models;

<<<<<<< HEAD
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotasSemana extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'notassemana';

    // Clave primaria (opcional si no usas 'id')
    protected $primaryKey = 'idNota';

    // Campos que se pueden asignar en masa
    protected $fillable = [
        'idSemana',
        'idEstudiante',
        'nota',
        'semana', // La columna que agregaste recientemente
    ];

    // Deshabilitar timestamps si no usas created_at y updated_at
    public $timestamps = false;

    // Si las relaciones están definidas, puedes agregar las relaciones como métodos:

    // Relación con la tabla 'semana'
    public function semana()
    {
        return $this->belongsTo(Semana::class, 'idSemana', 'idSemana');
    }

    // Relación con la tabla 'estudiante'
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante', 'idEstudiante');
=======
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NotasSemana extends Model
{
    protected $table = 'notassemana';
    protected $primaryKey = 'idNota';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'idSemana',
        'idEstudiante',
        'nota'
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    public function semana()
    {
        return $this->belongsTo(Semana::class, 'idSemana');
>>>>>>> origin/adrian
    }
}
