<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $products = Product::query()
            ->with('category')
            ->when(
                $request->search,
                function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('sku', 'like', "%{$search}%")
                            ->orWhere('barcode', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $request->category_id,
                fn ($query, $categoryId) =>
                    $query->where('category_id', $categoryId)
            )
            ->when(
                $request->has('is_active'),
                fn ($query) =>
                    $query->where(
                        'is_active',
                        $request->boolean('is_active')
                    )
            )
            ->latest()
            ->paginate(
                $request->integer('per_page', 10)
            );

        return response()->json($products);
    }

    public function store(
        StoreProductRequest $request
    ): JsonResponse {
        $product = Product::create(
            $request->validated()
        );

        $product->load('category');

        return response()->json([
            'message' => 'Product created successfully.',
            'data' => $product,
        ], 201);
    }

    public function show(
        Product $product
    ): JsonResponse {
        $product->load('category');

        return response()->json([
            'data' => $product,
        ]);
    }

    public function update(
        UpdateProductRequest $request,
        Product $product
    ): JsonResponse {
        $product->update(
            $request->validated()
        );

        $product->load('category');

        return response()->json([
            'message' => 'Product updated successfully.',
            'data' => $product,
        ]);
    }

    public function destroy(
        Product $product
    ): JsonResponse {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.',
        ]);
    }
}