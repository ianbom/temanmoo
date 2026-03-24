<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Classes;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the categories table.
     */
    public function run(): void
    {
        foreach (ClassSeeder::definitions() as $classDefinition) {
            $class = Classes::where('slug', $classDefinition['slug'])->first();

            if (! $class) {
                continue;
            }

            foreach ($classDefinition['categories'] as $name) {
                Category::updateOrCreate(
                    [
                        'class_id' => $class->id,
                        'name' => $name,
                    ],
                    []
                );
            }
        }
    }
}
