<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function __construct(protected PostService $postService) {}

    /**
     * Store a newly created post.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $this->postService->create(
            $request->only(['class_id', 'category_id', 'title', 'price', 'link']),
            $request->file('poster_image')
        );

        return back()->with('success', 'Post berhasil ditambahkan.');
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $this->postService->update(
            $post,
            $request->only(['class_id', 'category_id', 'title', 'price', 'link']),
            $request->file('poster_image')
        );

        return back()->with('success', 'Post berhasil diperbarui.');
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->postService->delete($post);

        return back()->with('success', 'Post berhasil dihapus.');
    }
}
