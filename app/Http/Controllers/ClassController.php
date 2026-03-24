<?php

namespace App\Http\Controllers;

use App\Http\Requests\Class\StoreClassRequest;
use App\Http\Requests\Class\UpdateClassRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Classes;
use App\Services\ClassService;
use App\Services\PostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassController extends Controller
{
    public function __construct(
        protected ClassService $classService,
        protected PostService $postService,
    ) {}

    /**
     * Display a listing of classes.
     */
    public function index(): Response
    {
        return Inertia::render('admin/class/index', [
            'classes' => ClassResource::collection($this->classService->getAll()),
        ]);
    }

    /**
     * Display the specified class with its posts.
     */
    public function show(Request $request, Classes $class): Response
    {
        $categoryId = $request->query('category_id') ? (int) $request->query('category_id') : null;

        return Inertia::render('admin/class/show', [
            'classItem'  => new ClassResource($class),
            'posts'      => PostResource::collection($this->postService->getByClass($class, $categoryId)),
            'categories' => Category::where('class_id', $class->id)
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters'    => [
                'category_id' => $categoryId,
            ],
        ]);
    }

    /**
     * Store a newly created class.
     */
    public function store(StoreClassRequest $request): RedirectResponse
    {
        $this->classService->create(
            $request->only(['name', 'color', 'footer_text', 'instagram_url']),
            $request->file('poster_image'),
            $request->file('logo_image')
        );

        return back()->with('success', 'Kelas berhasil ditambahkan.');
    }

    /**
     * Update the specified class.
     */
    public function update(UpdateClassRequest $request, Classes $class): RedirectResponse
    {
        $this->classService->update(
            $class,
            $request->only(['name', 'color', 'footer_text', 'instagram_url']),
            $request->file('poster_image'),
            $request->file('logo_image')
        );

        return back()->with('success', 'Kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified class.
     */
    public function destroy(Classes $class): RedirectResponse
    {
        $this->classService->delete($class);

        return back()->with('success', 'Kelas berhasil dihapus.');
    }

    /**
     * Public-facing class detail page.
     */
    public function publicShow(Request $request, string $slug): Response
    {
        $class = Classes::where('slug', $slug)->firstOrFail();
        $categoryId = $request->query('category_id') ? (int) $request->query('category_id') : null;
        $search = $request->query('search');

        $query = $class->posts()->with('category')->latest();

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        return Inertia::render('class', [
            'classItem'  => new ClassResource($class),
            'posts'      => PostResource::collection($query->paginate(8)->withQueryString()),
            'categories' => Category::whereIn('id', $class->posts()->distinct()->pluck('category_id'))
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters'    => [
                'category_id' => $categoryId,
                'search'      => $search,
            ],
        ]);
    }
}
