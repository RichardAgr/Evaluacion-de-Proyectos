<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EstudianteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estudiantes = [
            ['agarcia', 'Ana', 'García', 'Sanchez', 'passAna1', NULL, 0],
            ['lhernandez', 'Luis', 'Hernández', 'Torres', 'passLuis2', NULL, 0],
            ['jmendez', 'Juan', 'Méndez', 'Lopez', 'passJuan3', NULL, 0],
            ['srodriguez', 'Sofia', 'Rodríguez', 'Ramirez', 'passSofia4', NULL, 0],
            ['cdiaz', 'Carlos', 'Díaz', 'Fernández', 'passCarlos5', NULL, 0],
            ['lmorales', 'Lucía', 'Morales', 'González', 'passLucia6', NULL, 0],
            ['dcruz', 'David', 'Cruz', 'Muñoz', 'passDavid7', NULL, 0],
            ['emartinez', 'Elena', 'Martínez', 'Vargas', 'passElena8', NULL, 0],
            ['jlopez', 'Jorge', 'Lopez', 'Pacheco', 'passJorge9', NULL, 0],
            ['pperez', 'Paula', 'Pérez', 'Gómez', 'passPaula10', NULL, 0],
            ['acastro', 'Antonio', 'Castro', 'Silva', 'passAntonio11', NULL, 0],
            ['mfernandez', 'María', 'Fernández', 'Rojas', 'passMaria12', NULL, 0],
            ['rmolina', 'Raquel', 'Molina', 'Torres', 'passRaquel13', NULL, 0],
            ['fcarrasco', 'Felipe', 'Carrasco', 'Ramírez', 'passFelipe14', NULL, 0],
            ['scampos', 'Sara', 'Campos', 'López', 'passSara15', NULL, 0],
            ['malonso', 'Miguel', 'Alonso', 'Ortiz', 'passMiguel16', NULL, 0],
            ['cmoreno', 'Claudia', 'Moreno', 'Jiménez', 'passClaudia17', NULL, 1],
            ['areyes', 'Antonio', 'Reyes', 'Castillo', 'passAntonio18', NULL, 1],
            ['ivega', 'Isabel', 'Vega', 'Espinoza', 'passIsabel19', NULL, 1],
            ['aflores', 'Alberto', 'Flores', 'Salinas', 'passAlberto20', NULL, 1],
            ['rmontes', 'Rosa', 'Montes', 'Hernández', 'passRosa21', NULL, 0],
            ['tvillar', 'Tomás', 'Villar', 'García', 'passTomas22', NULL, 1],
            ['squintana', 'Sandra', 'Quintana', 'Ramos', 'passSandra23', NULL, 1],
            ['hpena', 'Hugo', 'Peña', 'Maldonado', 'passHugo24', NULL, 0],
            ['vjoaco', 'Joaquin', 'Villalpando', 'Maldonado', 'passJoaco25', NULL, 0],
            ['aricky', 'Ricardo', 'Aguilar', 'Choque', 'passRicky26', NULL, 0],
            ['jsilva', 'Juan', 'Silva', 'Perez', 'passJuan27', NULL, 0],
            ['cgomez', 'Clara', 'Gomez', 'Rivera', 'passClara28', NULL, 0],
            ['dsantos', 'Diego', 'Santos', 'Sanchez', 'passDiego29', NULL, 0],
            ['eperez', 'Elena', 'Perez', 'Quispe', 'passElena30', NULL, 0],
            ['framos', 'Fernando', 'Ramos', 'Medina', 'passFernando31', NULL, 0],
            
            ['mlopez', 'Maria', 'Lopez', 'Hernandez', 'passMaria32', NULL, 0],
        ];

        foreach ($estudiantes as $index => $estudiante) {
            DB::table('estudiante')->insert([
                'idEstudiante' => $index + 1,
                'nombreCuenta' => $estudiante[0],
                'nombreEstudiante' => $estudiante[1],
                'primerApellido' => $estudiante[2],
                'segundoApellido' => $estudiante[3],
                'contrasena' => Hash::make($estudiante[4]),
                'numerodefaltasest' => $estudiante[5],
                'disponible' => $estudiante[6],
            ]);
        }
    }
}
