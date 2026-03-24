<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    /**
     * Get all categories with latest first.
     */
    public function getAll()
    {
        return Category::with(['class:id,name'])
            ->latest()
            ->get();
    }

    /**
     * Create a new category.
     */
    public function create(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Update an existing category.
     */
    public function update(Category $category, array $data): Category
    {
        $category->update($data);

        return $category->fresh();
    }

    /**
     * Delete a category.
     */
    public function delete(Category $category): void
    {
        $category->delete();
    }
}
