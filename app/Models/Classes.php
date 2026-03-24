<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classes extends Model
{
    /** @use HasFactory<\Database\Factories\ClassesFactory> */
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'slug',
        'color',
        'poster_image',
        'logo_image',
        'footer_text',
        'instagram_url',
    ];

    /**
     * Get all posts belonging to this class.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'class_id');
    }

    /**
     * Get all categories belonging to this class.
     */
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'class_id');
    }
}
