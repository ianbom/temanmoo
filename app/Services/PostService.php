<?php

namespace App\Services;

use App\Models\Classes;
use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class PostService
{
    /**
     * Get paginated posts for a specific class, optionally filtered by category.
     */
    public function getByClass(Classes $class, ?int $categoryId = null, int $perPage = 12): LengthAwarePaginator
    {
        $query = $class->posts()->with('category')->latest();

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Create a new post.
     */
    public function create(array $data, $posterImage): Post
    {
        $data['poster_image'] = $posterImage->store('posts', 'public');

        return Post::create($data);
    }

    /**
     * Update an existing post.
     */
    public function update(Post $post, array $data, $posterImage = null): Post
    {
        if ($posterImage) {
            if ($post->poster_image) {
                Storage::disk('public')->delete($post->poster_image);
            }

            $data['poster_image'] = $posterImage->store('posts', 'public');
        }

        $post->update($data);

        return $post->fresh();
    }

    /**
     * Delete a post.
     */
    public function delete(Post $post): void
    {
        if ($post->poster_image) {
            Storage::disk('public')->delete($post->poster_image);
        }

        $post->delete();
    }
}
