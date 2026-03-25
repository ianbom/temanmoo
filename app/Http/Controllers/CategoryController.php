<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Classes;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $categoryService) {}

    /**
     * Display a listing of categories.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'sort', 'direction', 'per_page', 'class_id']);

        return Inertia::render('admin/category/index', [
            'categories' => CategoryResource::collection($this->categoryService->getAdminList($filters)),
            'classes' => Classes::orderBy('name')->get(['id', 'name']),
            'filters' => (object) $filters,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->create($request->validated());

        return back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    /**
     * Update the specified category.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categoryService->update($category, $request->validated());

        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryService->delete($category);

        return back()->with('success', 'Kategori berhasil dihapus.');
    }
}
