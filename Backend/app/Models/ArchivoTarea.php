<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tarea;
class ArchivoTarea extends Model
{
    protected $table = 'archivostarea';

    // Relación con la tarea
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'idTarea');
    }
}