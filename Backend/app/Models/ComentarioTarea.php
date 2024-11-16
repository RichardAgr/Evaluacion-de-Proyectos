<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    use HasFactory;

    protected $table = 'comentarioTarea';
    public $timestamps = false;

    protected $fillable = [
        'estudiante_idEstudiante',
        'semana_idSemana',
        'comentario',
    ];

    // Indicar que no hay claves incrementales (sin columna "id" autoincremental)
    public $incrementing = false;

    /**
     * Encuentra un registro por claves primarias compuestas.
     *
     * @param int $idEstudiante
     * @param int $idSemana
     * @return ComentarioTarea|null
     */
    public static function findByCompositeKey($idEstudiante, $idSemana)
    {
        return self::where('estudiante_idEstudiante', $idEstudiante)
            ->where('semana_idSemana', $idSemana)
            ->first();
    }

    /**
     * Crea o actualiza un registro basado en claves primarias compuestas.
     *
     * @param array $data
     * @return void
     */
    public static function createOrUpdate($data)
    {
        // Encuentra el registro existente
        $record = self::findByCompositeKey($data['estudiante_idEstudiante'], $data['semana_idSemana']);

        if ($record) {
            // Actualiza el registro si ya existe
            $record->update(['comentario' => $data['comentario']]);
        } else {
            // Crea un nuevo registro si no existe
            self::create($data);
        }
    }

    /**
     * Relación con el modelo Estudiante.
     */
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_idEstudiante');
    }

    /**
     * Relación con el modelo Semana.
     */
    public function semana()
    {
        return $this->belongsTo(Semana::class, 'semana_idSemana');
    }
}
