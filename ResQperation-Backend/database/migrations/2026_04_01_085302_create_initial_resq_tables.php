<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    // 0. EXTERNAL SYSTEM ACCOUNTS
    Schema::create('SafeTrackAccount', function ($table) {
        $table->id('SafeTrackAccountID');
        $table->string('ExternalUUID', 100);
        $table->enum('AccountType', ['HOUSEHOLD', 'RESPONDER']);
        $table->timestamps();
    });

    // 1. HOUSEHOLD MODULE
    Schema::create('Household', function ($table) {
        $table->id('HouseholdID');
        $table->unsignedBigInteger('SafeTrackAccountID')->nullable();
        $table->string('HouseholdHeadName', 100);
        $table->string('PhoneNumber', 30)->nullable();
        $table->string('Barangay', 100)->nullable();
        $table->text('Address')->nullable();
        $table->string('QRCode')->unique()->nullable();
        $table->timestamps();

        $table->foreign('SafeTrackAccountID')->references('SafeTrackAccountID')->on('SafeTrackAccount');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initial_resq_tables');
    }
};
