<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('roles')) {
            return;
        }

        $schemaPath = database_path('schema/create_tables_2.sql');

        if (! file_exists($schemaPath)) {
            throw new RuntimeException("Shared schema file not found: {$schemaPath}");
        }

        DB::unprepared(file_get_contents($schemaPath));
    }

    public function down(): void
    {
        // This database is shared across multiple capstone systems.
        // Do not drop shared tables from an application rollback.
    }
};
