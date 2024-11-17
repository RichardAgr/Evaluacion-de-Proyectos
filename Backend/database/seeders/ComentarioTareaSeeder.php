<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ComentarioTarea;

class ComentarioTareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'idEstudiante' => 2,
                'idSemana' => 1,
                'comentario' => 'Este es un comentario de ejemplo para el estudiante 1.',
            ],
            [
                'idEstudiante' => 5,
                'idSemana' => 1,
                'comentario' => 'Este es otro comentario para el estudiante 2.',
            ]
        ];

        foreach ($data as $item) {
            ComentarioTarea::create($item);
        }
    }
}
