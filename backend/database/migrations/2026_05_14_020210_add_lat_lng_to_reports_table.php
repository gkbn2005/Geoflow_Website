<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()

       {
           Schema::table('reports', function (Blueprint $table) {
               $table->decimal('lat', 10, 7)->nullable();
               $table->decimal('lng', 10, 7)->nullable();
           });
       }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::table('reports', function (Blueprint $table) {
                   $table->dropColumn(['lat', 'lng']);
               });
    }
};
