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
        Schema::create('dialoges', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('dialogue_user_id')->unsigned();
            $table->foreign('dialogue_user_id')->references('id')->on('users');
            $table->bigInteger('dialogue_acceptor_id')->unsigned();
            $table->foreign('dialogue_acceptor_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dialoges');
    }
};
