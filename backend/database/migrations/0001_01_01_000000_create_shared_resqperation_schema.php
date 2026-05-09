<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('roles')) {
            return;
        }

        if (DB::connection()->getDriverName() === 'sqlite') {
            $this->createLocalSqliteSchema();

            return;
        }

        $schemaPath = database_path('schema/create_tables_2.sql');

        if (! file_exists($schemaPath)) {
            throw new RuntimeException("Shared schema file not found: {$schemaPath}");
        }

        DB::unprepared(file_get_contents($schemaPath));
    }

    private function createLocalSqliteSchema(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('role_id');
            $table->string('role_key', 50)->unique();
            $table->string('role_name', 100);
        });

        Schema::create('households', function (Blueprint $table) {
            $table->string('household_id')->primary();
            $table->string('household_code')->nullable()->unique();
            $table->string('household_name', 100)->nullable();
            $table->string('contact_number', 50)->nullable();
            $table->string('emergency_contact', 50)->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create('household_members', function (Blueprint $table) {
            $table->string('member_id')->primary();
            $table->string('household_id')->nullable();
            $table->string('full_name', 150)->nullable();
            $table->string('relationship', 100)->nullable();

            $table->foreign('household_id')
                ->references('household_id')
                ->on('households')
                ->nullOnDelete();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->string('user_id')->primary();
            $table->string('name', 100)->nullable();
            $table->string('username', 100)->nullable()->unique();
            $table->string('email')->nullable()->unique();
            $table->string('password');
            $table->unsignedInteger('role_id')->nullable();
            $table->string('contact_number', 50)->nullable();
            $table->string('assigned_center_id')->nullable();
            $table->string('household_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('role_id')
                ->references('role_id')
                ->on('roles')
                ->nullOnDelete();

            $table->foreign('household_id')
                ->references('household_id')
                ->on('households')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        // This database is shared across multiple capstone systems.
        // Do not drop shared tables from an application rollback.
    }
};
