<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ComentarioTarea;

class ComentarioTareaSeeder extends Seeder
{
    public function run()
    {
        ComentarioTarea::create([
            'estudiante_idEstudiante' => 1, // Reemplaza con IDs existentes
            'semana_idSemana' => 1,
            'comentario' => 'Buen desempeño en las tareas.',
        ]);

        ComentarioTarea::create([
            'estudiante_idEstudiante' => 2,
            'semana_idSemana' => 1,
            'comentario' => 'Debe mejorar su participación.',
        ]);

        // Agrega más registros según sea necesario
    }
}
