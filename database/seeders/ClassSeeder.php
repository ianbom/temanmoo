<?php

namespace Database\Seeders;

use App\Models\Classes;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    /**
     * Full class definitions used by class/category/post seeders.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function definitions(): array
    {
        return [
            [
                'name' => 'Temanmoo Hijrah',
                'slug' => 'hijrah',
                'color' => '#0F4C81',
                'poster_image' => 'seeders/classes/temanmoo-hijrah-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-hijrah-logo.png',
                'footer_text' => 'Temanimu lebih dekat dengan Allah dan lebih baik terhadap sesama.',
                'instagram_url' => 'https://instagram.com/temanmoobelajar',
                'categories' => ['Bundling', 'Iman', 'Hati', 'Taubat', 'Ibadah', 'Akhlak', 'Doa', 'Kisah', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Hawa',
                'slug' => 'hawa',
                'color' => '#A83279',
                'poster_image' => 'seeders/classes/temanmoo-hawa-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-hawa-logo.png',
                'footer_text' => 'Temanimu menjadi perempuan yang utuh dan penuh manfaat.',
                'instagram_url' => 'https://www.instagram.com/temanmoohawa/',
                'categories' => ['Bundling', 'Ibadah Perempuan', 'Kematangan Diri', 'Kesehatan', 'Keterampilan Hidup', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Tumbuh',
                'slug' => 'tumbuh',
                'color' => '#2E7D32',
                'poster_image' => 'seeders/classes/temanmoo-tumbuh-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-tumbuh-logo.png',
                'footer_text' => 'Temanimu terus berbenah dan naik level dalam hidup.',
                'instagram_url' => 'https://www.instagram.com/temanmootumbuh/',
                'categories' => ['Bundling', 'Arah Hidup', 'Pola Pikir', 'Manajemen Emosi', 'Pemecahan Masalah', 'Produktivitas', 'Relasi', 'Kepemimpinan Diri', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Pulih',
                'slug' => 'pulih',
                'color' => '#6D4C41',
                'poster_image' => 'seeders/classes/temanmoo-pulih-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-pulih-logo.png',
                'footer_text' => 'Temanimu kembali tenang dan terus melangkah.',
                'instagram_url' => 'https://www.instagram.com/temanmoopulih/',
                'categories' => ['Bundling', 'Stres', 'Kecemasan', 'Mood', 'Harga Diri', 'Relasi', 'Citra Tubuh', 'Kecanduan', 'Trauma', 'Gangguan Berat', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Parenting',
                'slug' => 'parenting',
                'color' => '#FF8F00',
                'poster_image' => 'seeders/classes/temanmoo-parenting-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-parenting-logo.png',
                'footer_text' => 'Temanimu menjadi orang tua yang terampil dan suportif.',
                'instagram_url' => 'https://www.instagram.com/temanmooparenting/',
                'categories' => ['Bundling', 'Menjadi Orang Tua', 'Bayi (0-2)', 'Anak Dini (3-6)', 'Usia Sekolah (7-12)', 'Remaja (13-18)', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Pernikahan',
                'slug' => 'pernikahan',
                'color' => '#8E24AA',
                'poster_image' => 'seeders/classes/temanmoo-pernikahan-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-pernikahan-logo.png',
                'footer_text' => 'Temanimu membangun dan merawat pernikahan yang samawa.',
                'instagram_url' => 'https://www.instagram.com/temanmoopernikahan/',
                'categories' => ['Bundling', 'Persiapan Menikah', 'Fondasi Pernikahan', 'Kehangatan Hubungan', 'Ketahanan Rumah Tangga', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Keuangan',
                'slug' => 'keuangan',
                'color' => '#00695C',
                'poster_image' => 'seeders/classes/temanmoo-keuangan-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-keuangan-logo.png',
                'footer_text' => 'Temanimu menata keuangan yang stabil dan bertumbuh.',
                'instagram_url' => 'https://www.instagram.com/temanmookeuangan/',
                'categories' => ['Bundling', 'Fondasi Keuangan', 'Manajemen Keuangan', 'Strategi Investasi', 'Muamalah Syariah', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Sehat',
                'slug' => 'sehat',
                'color' => '#00897B',
                'poster_image' => 'seeders/classes/temanmoo-sehat-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-sehat-logo.png',
                'footer_text' => 'Temanimu sehat hari ini dan tetap prima di masa depan.',
                'instagram_url' => 'https://www.instagram.com/temanmoosehat/',
                'categories' => ['Bundling', 'Gaya Hidup', 'Metabolisme Tubuh', 'Struktur Gerak', 'Keseimbangan Fisik', 'Daya Tahan', 'Jantung dan Sirkulasi', 'Fungsi Organ', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Senja',
                'slug' => 'senja',
                'color' => '#5D4037',
                'poster_image' => 'seeders/classes/temanmoo-senja-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-senja-logo.png',
                'footer_text' => 'Temanimu menjalani hidup dengan tenang dan bermakna.',
                'instagram_url' => 'https://www.instagram.com/temanmoosenja/',
                'categories' => ['Bundling', 'Dinamika Peran', 'Kesehatan Usia Matang', 'Kemandirian Finansial', 'Persiapan Pulang', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Digital',
                'slug' => 'digital',
                'color' => '#3949AB',
                'poster_image' => 'seeders/classes/temanmoo-digital-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-digital-logo.png',
                'footer_text' => 'Temanimu menghasilkan uang melalui dunia digital.',
                'instagram_url' => 'https://www.instagram.com/temanmoodigital/',
                'categories' => ['Bundling', 'Konten', 'Affiliate', 'Freelance', 'Dropship', 'Produk Digital', 'Ads', 'Automation', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Bisnis',
                'slug' => 'bisnis',
                'color' => '#1565C0',
                'poster_image' => 'seeders/classes/temanmoo-bisnis-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-bisnis-logo.png',
                'footer_text' => 'Temanimu membangun usaha dengan cara yang realistis.',
                'instagram_url' => 'https://www.instagram.com/temanmoobisnis/',
                'categories' => ['Bundling', 'Perdagangan', 'Jasa', 'Kuliner', 'Produk', 'Kemitraan', 'Agribisnis', 'Properti', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Scale',
                'slug' => 'scale',
                'color' => '#512DA8',
                'poster_image' => 'seeders/classes/temanmoo-scale-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-scale-logo.png',
                'footer_text' => 'Temanimu mengembangkan bisnis agar naik level.',
                'instagram_url' => 'https://www.instagram.com/temanmooscale/',
                'categories' => ['Bundling', 'Strategi', 'Produk', 'Markerting', 'Sales', 'Operasional', 'Keuangan', 'Leadership', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Karier',
                'slug' => 'karier',
                'color' => '#00838F',
                'poster_image' => 'seeders/classes/temanmoo-karier-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-karier-logo.png',
                'footer_text' => 'Temanimu berkembang di dunia kerja.',
                'instagram_url' => 'https://www.instagram.com/temanmookarier/',
                'categories' => ['Bundling', 'Masuk Kerja', 'Sukses Profesi', 'Skill Profesional', 'Pengembangan Karier', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Akademia',
                'slug' => 'akademia',
                'color' => '#6A1B9A',
                'poster_image' => 'seeders/classes/temanmoo-akademia-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-akademia-logo.png',
                'footer_text' => 'Temanimu menavigasi dunia kuliah dan riset.',
                'instagram_url' => 'https://www.instagram.com/temanmooakademia/',
                'categories' => ['Bundling', 'Studi Kampus', 'Penelitian', 'Tools Riset', 'Peluang Akademik', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Sains',
                'slug' => 'sains',
                'color' => '#2E7D32',
                'poster_image' => 'seeders/classes/temanmoo-sains-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-sains-logo.png',
                'footer_text' => 'Temanimu memahami dunia melalui ilmu pengetahuan.',
                'instagram_url' => 'https://www.instagram.com/temanmoosains/',
                'categories' => ['Bundling', 'Sains', 'Alam Semesta', 'Kehidupan', 'Manusia', 'Teknologi', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Hobi',
                'slug' => 'hobi',
                'color' => '#F57C00',
                'poster_image' => 'seeders/classes/temanmoo-hobi-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-hobi-logo.png',
                'footer_text' => 'Temanimu menikmati hidup melalui berbagai hobi.',
                'instagram_url' => 'https://www.instagram.com/temanmoohobi/',
                'categories' => ['Bundling', 'Gerak', 'Alam', 'Kuliner', 'Kreatif', 'Koleksi', 'Lainnya'],
            ],
            [
                'name' => 'Temanmoo Anak',
                'slug' => 'anak',
                'color' => '#C2185B',
                'poster_image' => 'seeders/classes/temanmoo-anak-banner.jpg',
                'logo_image' => 'seeders/classes/temanmoo-anak-logo.png',
                'footer_text' => 'Temanimu belajar dan bereksplorasi.',
                'instagram_url' => 'https://www.instagram.com/temanmooanak/',
                'categories' => ['Bundling', 'Diniyyah', 'Matematika', 'Sains', 'Teknologi', 'Seni', 'Lainnya'],
            ],
        ];
    }

    /**
     * Seed the classes table.
     */
    public function run(): void
    {
        foreach (self::definitions() as $classDefinition) {
            Classes::updateOrCreate(
                ['slug' => $classDefinition['slug']],
                [
                    'name' => $classDefinition['name'],
                    'color' => $classDefinition['color'],
                    'poster_image' => $classDefinition['poster_image'],
                    'logo_image' => $classDefinition['logo_image'],
                    'footer_text' => $classDefinition['footer_text'],
                    'instagram_url' => $classDefinition['instagram_url'],
                ]
            );
        }
    }
}
