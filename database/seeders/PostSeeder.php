<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Classes;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Generate sample posts for each class.
     */
    /**
     * Seed the posts table.
     */
    public function run(): void
    {
        foreach (ClassSeeder::definitions() as $classDefinition) {
            $class = Classes::where('slug', $classDefinition['slug'])->first();

            if (! $class) {
                continue;
            }

            $categoryMap = Category::where('class_id', $class->id)
                ->pluck('id', 'name');

            $posts = $this->buildPosts($classDefinition['name'], $classDefinition['slug'], $classDefinition['categories']);

            foreach ($posts as $postData) {
                $categoryId = $categoryMap[$postData['category']] ?? null;

                if (! $categoryId) {
                    continue;
                }

                Post::updateOrCreate(
                    [
                        'class_id' => $class->id,
                        'title' => $postData['title'],
                    ],
                    [
                        'category_id' => $categoryId,
                        'price' => $postData['price'],
                        'link' => $postData['link'],
                        'poster_image' => $postData['poster_image'],
                    ]
                );
            }
        }
    }

    /**
     * Build 12 post placeholders for one class.
     *
     * @param array<int, string> $categories
     * @return array<int, array<string, mixed>>
     */
    private function buildPosts(string $className, string $classSlug, array $categories): array
    {
        if ($categories === []) {
            return [];
        }

        $themes = [
            'Dasar',
            'Praktis',
            'Intensif',
            'Lanjutan',
            'Penerapan',
            'Mastery',
        ];

        $posts = [];
        $basePrice = 39000;

        for ($i = 1; $i <= 12; $i++) {
            $category = $categories[($i - 1) % count($categories)];
            $theme = $themes[($i - 1) % count($themes)];
            $title = sprintf('%s %s %s %02d', $category, str_replace('Temanmoo ', '', $className), $theme, $i);
            $titleSlug = Str::slug($title);

            $posts[] = [
                'category' => $category,
                'title' => $title,
                'price' => $basePrice + ($i * 12000),
                'link' => sprintf('https://temanmoo-belajar.myr.id/portal/%s/%s', $classSlug, $titleSlug),
                'poster_image' => sprintf('seeders/posts/%s-%02d.jpg', $classSlug, $i),
            ];
        }

        return $posts;
    }
}
