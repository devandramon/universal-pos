<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('category.create') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:100',
                'unique:categories,name',
            ],

            'slug' => [
                'required',
                'string',
                'max:120',
                'alpha_dash',
                'unique:categories,slug',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ];
    }
}