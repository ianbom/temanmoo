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
     * Get paginated admin list with filters.
     */
    public function getAdminList(array $filters = [])
    {
        $query = Category::with(['class:id,name']);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('name', 'like', "%{$search}%");
        }

        if (!empty($filters['class_id']) && $filters['class_id'] !== 'all') {
            $query->where('class_id', $filters['class_id']);
        }

        $sortField = $filters['sort'] ?? 'created_at';
        $sortDirection = $filters['direction'] ?? 'desc';
        
        $allowedSortFields = ['name', 'created_at', 'id', 'class_id'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        $perPage = $filters['per_page'] ?? 10;
        return $query->paginate($perPage)->withQueryString();
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
