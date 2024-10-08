<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semana extends Model
{
    protected $table = 'semana';
    protected $primaryKey = 'idSemana';
    protected $fillable = [
        'idSprint',
    ];

    public function tareas(): HasMany
    {
        return $this->hasMany(Tarea::class, 'idSemana');
    }

    public function sprint()
    {
        return $this->belongsTo(Sprint::class, 'idSprint');
    }
}
