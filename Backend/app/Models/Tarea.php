<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Tarea extends Model
{
    use HasFactory;
    protected $table = 'tarea'; // Nombre de la tabla
    protected $primaryKey = 'idTarea'; // Especificar la clave primaria

    public $timestamps = false;

    protected $fillable = [
        'idSemana',
        'comentario', // Asegúrate de incluir todas las propiedades que quieres permitir
        'textoTarea',
        'fechaEntrega',
        'notaTarea',
    ];


    // Relación con los estudiantes (muchos a muchos)
    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'tareasestudiantes', 'idTarea', 'idEstudiante');
    }

    // Relación con los archivos de tarea (uno a muchos)
    public function archivos()
    {
        return $this->hasMany(ArchivoTarea::class, 'idTarea');
    }
}
