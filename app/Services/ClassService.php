<?php

namespace App\Services;

use App\Models\Classes;
use Illuminate\Support\Facades\Storage;

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
    public function create(array $data, $posterImage): Classes
    {
        $data['poster_image'] = $posterImage->store('classes', 'public');

        return Classes::create($data);
    }

    /**
     * Update an existing class.
     */
    public function update(Classes $class, array $data, $posterImage = null): Classes
    {
        if ($posterImage) {
            // Delete old image
            if ($class->poster_image) {
                Storage::disk('public')->delete($class->poster_image);
            }

            $data['poster_image'] = $posterImage->store('classes', 'public');
        }

        $class->update($data);

        return $class->fresh();
    }

    /**
     * Delete a class.
     */
    public function delete(Classes $class): void
    {
        // Delete image from storage
        if ($class->poster_image) {
            Storage::disk('public')->delete($class->poster_image);
        }

        $class->delete();
    }
}
