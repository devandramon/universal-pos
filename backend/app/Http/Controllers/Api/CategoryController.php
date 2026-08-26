<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->latest()
            ->paginate(10);

        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return (new CategoryResource($category))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Category $category)
    {
        abort_unless(
            request()->user()?->can('category.view'),
            403,
            'You do not have permission to view categories.'
        );

        return new CategoryResource($category);
    }

    public function update(
        UpdateCategoryRequest $request,
        Category $category
    ) {
        $category->update($request->validated());

        return new CategoryResource($category->fresh());
    }

    public function destroy(Category $category): JsonResponse
    {
        abort_unless(
            request()->user()?->can('category.delete'),
            403,
            'You do not have permission to delete categories.'
        );

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.',
        ]);
    }
}