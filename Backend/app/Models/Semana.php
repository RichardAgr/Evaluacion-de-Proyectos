<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semana extends Model
{
    protected $table = 'semana'; // Nombre de la tabla

    public function tareas(): HasMany
    {
        return $this->hasMany(Tarea::class, 'idSemana', 'idSemana');
    }
}
