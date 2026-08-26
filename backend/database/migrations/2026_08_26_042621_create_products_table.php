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
    Schema::create('products', function (Blueprint $table) {
        $table->id();

        $table->foreignId('category_id')
            ->constrained()
            ->cascadeOnUpdate()
            ->restrictOnDelete();

        $table->string('sku')->unique();
        $table->string('barcode')->nullable()->unique();

        $table->string('name');

        $table->text('description')->nullable();

        $table->decimal('cost_price', 15, 2)
            ->default(0);

        $table->decimal('selling_price', 15, 2)
            ->default(0);

        $table->decimal('stock', 15, 2)
            ->default(0);

        $table->decimal('minimum_stock', 15, 2)
            ->default(0);

        $table->string('unit')
            ->default('pcs');

        $table->string('image')
            ->nullable();

        $table->boolean('is_active')
            ->default(true);

        $table->timestamps();

        $table->index('name');
        $table->index('is_active');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
