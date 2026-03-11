<?php

namespace App\Services;

use App\Models\Classes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ClassService
{
    /**
     * Get all classes with latest first.
     */
    public function getAll()
    {
        return Classes::latest()->get();
    }

    /**
     * Create a new class.
     */
    public function create(array $data, $posterImage, $logoImage = null): Classes
    {
        $data['poster_image'] = $posterImage->store('classes', 'public');
        $data['slug'] = $this->generateUniqueSlug($data['name']);

        if ($logoImage) {
            $data['logo_image'] = $logoImage->store('classes/logos', 'public');
        }

        return Classes::create($data);
    }

    /**
     * Update an existing class.
     */
    public function update(Classes $class, array $data, $posterImage = null, $logoImage = null): Classes
    {
        if ($posterImage) {
            if ($class->poster_image) {
                Storage::disk('public')->delete($class->poster_image);
            }
            $data['poster_image'] = $posterImage->store('classes', 'public');
        }

        if ($logoImage) {
            if ($class->logo_image) {
                Storage::disk('public')->delete($class->logo_image);
            }
            $data['logo_image'] = $logoImage->store('classes/logos', 'public');
        }

        // Regenerate slug if name changed
        if (isset($data['name']) && $data['name'] !== $class->name) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $class->id);
        }

        $class->update($data);

        return $class->fresh();
    }

    /**
     * Delete a class.
     */
    public function delete(Classes $class): void
    {
        if ($class->poster_image) {
            Storage::disk('public')->delete($class->poster_image);
        }

        if ($class->logo_image) {
            Storage::disk('public')->delete($class->logo_image);
        }

        $class->delete();
    }

    /**
     * Generate a unique slug from a given name.
     */
    private function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $slug = Str::slug($name);
        $original = $slug;
        $counter = 1;

        while (
            Classes::where('slug', $slug)
                ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $original . '-' . $counter++;
        }

        return $slug;
    }
}
