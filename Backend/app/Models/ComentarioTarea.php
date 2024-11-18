<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComentarioTarea extends Model
{
    protected $table = 'comentarioTarea';
    protected $primaryKey = ['idEstudiante', 'idSemana'];

    /**
     * No es autoincremental por tener llave primaria compuesta
     */
    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'idEstudiante',
        'idSemana',
        'comentario',
    ];
    public static function findByCompositeKey($idEstudiante, $idSemana)
    {
        return self::where('idEstudiante', $idEstudiante)
            ->where('idEstudiante', $idSemana)
            ->first();
    }
    public static function createOrUpdate($data)
    {
        // Encuentra el registro existente
        $record = self::findByCompositeKey($data['idEstudiante'], $data['idEstudiante']);

        if ($record) {
            // Actualiza el registro si ya existe
            $record->update(['comentario' => $data['comentario']]);
        } else {
            // Crea un nuevo registro si no existe
            self::create($data);
        }
    }

    /**
     * obtiene el estudiante que tiene el comentario
     */
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante');
    }

    /**
     * obtiene la semana que tiene el comentario
     */
    public function semana()
    {
        return $this->belongsTo(Semana::class, 'idSemana');
    }
}