<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class RunSqlScript extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = file_get_contents(database_path('migrations/tis.sql'));
        DB::unprepared($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Puedes definir aquí cómo deshacer los cambios si es necesario
        DB::unprepared('DROP TABLE IF EXISTS evaluacionPar');
        DB::unprepared('DROP TABLE IF EXISTS estudiantesempresas');
        DB::unprepared('DROP TABLE IF EXISTS docente');
        DB::unprepared('DROP TABLE IF EXISTS estudiante');
        DB::unprepared('DROP TABLE IF EXISTS empresa');
    }
}
