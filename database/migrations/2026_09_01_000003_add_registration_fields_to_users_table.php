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
        Schema::table('users', function (Blueprint $table) {
            $table->string('surname')->nullable()->after('name');
            $table->string('phone_number')->nullable()->after('email');
            $table->date('date_of_birth')->nullable()->after('phone_number');
            $table->string('street_address')->nullable()->after('date_of_birth');
            $table->string('city')->nullable()->after('street_address');
            $table->string('country')->nullable()->after('city');
            $table->string('postal_code')->nullable()->after('country');
            $table->boolean('agreed_to_terms')->default(false)->after('postal_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'surname',
                'phone_number',
                'date_of_birth',
                'street_address',
                'city',
                'country',
                'postal_code',
                'agreed_to_terms',
            ]);
        });
    }
};
