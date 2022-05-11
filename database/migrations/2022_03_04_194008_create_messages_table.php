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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            // сзявывание юзера в таблице юзеров
            $table->foreign('user_id')->references('id')->on('users');
            $table->bigInteger('acceptor_id')->unsigned();
            // сзявывание юзера в таблице юзеров
            $table->foreign('acceptor_id')->references('id')->on('users');
            $table->text('message_text');
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
        Schema::dropIfExists('messages');
    }
};
