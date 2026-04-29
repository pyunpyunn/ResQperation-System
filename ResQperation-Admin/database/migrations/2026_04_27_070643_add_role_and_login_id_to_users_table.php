<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('login_id', 20)->nullable()->unique()->after('id');
            $table->string('role', 50)->default('admin')->after('email');
            $table->boolean('is_active')->default(true)->after('role');
            $table->timestamp('last_login_at')->nullable()->after('remember_token');
        });

        $existingUsers = DB::table('users')
            ->whereNull('login_id')
            ->orderBy('id')
            ->get(['id']);

        foreach ($existingUsers as $user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'login_id' => str_pad((string) (9000000000 + $user->id), 10, '0', STR_PAD_LEFT),
                ]);
        }

        $temporaryAccounts = [
            [
                'name' => 'ResQperation Super Admin',
                'email' => 'super-admin@resqperation.local',
                'login_id' => '2024035500',
                'role' => 'super_admin',
                'password' => Hash::make('temp_pass'),
            ],
            [
                'name' => 'ResQperation HQ Admin',
                'email' => 'hq-admin@resqperation.local',
                'login_id' => '0427202601',
                'role' => 'admin',
                'password' => Hash::make('temp_pass1'),
            ],
        ];

        foreach ($temporaryAccounts as $account) {
            DB::table('users')->updateOrInsert(
                ['login_id' => $account['login_id']],
                [
                    ...$account,
                    'is_active' => true,
                    'email_verified_at' => now(),
                    'remember_token' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')
            ->whereIn('login_id', ['2024035500', '0427202601'])
            ->delete();

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['login_id', 'role', 'is_active', 'last_login_at']);
        });
    }
};
