<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbstimmungsdateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('abstimmungsdate', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp("date")->nullable();
            $table->integer("votes");
            $table->foreignId("fk_terminabstimmung")->references("id")->on("terminabstimmung");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('abstimmungsdate');
    }
}
