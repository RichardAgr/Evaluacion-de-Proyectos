<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RunSqlScript extends Migration
{
    public function up(): void
    {
        // Verifica si el script ya se ha ejecutado
        if (!DB::table('migrations')->where('id', '2')->exists()) {
            $sql = file_get_contents(database_path('migrations/tis.sql'));
            DB::unprepared($sql);
            
            // Registrar que el script ha sido ejecutado
            DB::table('migrations')->insert(['id' => '2']);
        }
    }

    public function down(): void
    {
        // Puedes definir aquí cómo deshacer los cambios si es necesario
        DB::unprepared('DROP TABLE IF EXISTS evaluacionPar');
        DB::unprepared('DROP TABLE IF EXISTS estudiantesempresas');
        DB::unprepared('DROP TABLE IF EXISTS docente');
        DB::unprepared('DROP TABLE IF EXISTS estudiante');
        DB::unprepared('DROP TABLE IF EXISTS empresa');

        // Eliminar el registro que indica que el script fue ejecutado
        DB::table('migrations')->where('id', '2')->delete();
    }
}
