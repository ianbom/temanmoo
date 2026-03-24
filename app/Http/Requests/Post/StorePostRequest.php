<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'class_id'     => ['required', 'exists:classes,id'],
            'category_id'  => [
                'required',
                Rule::exists('categories', 'id')->where(fn ($query) => $query->where('class_id', $this->integer('class_id'))),
            ],
            'title'        => ['required', 'string', 'max:255'],
            'price'        => ['required', 'numeric', 'min:0'],
            'link'         => ['required', 'url', 'max:2048'],
            'poster_image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10066'],
        ];
    }

    public function messages(): array
    {
        return [
            'class_id.required'     => 'Kelas wajib dipilih.',
            'class_id.exists'       => 'Kelas tidak ditemukan.',
            'category_id.required'  => 'Kategori wajib dipilih.',
            'category_id.exists'    => 'Kategori tidak ditemukan untuk kelas yang dipilih.',
            'title.required'        => 'Judul wajib diisi.',
            'price.required'        => 'Harga wajib diisi.',
            'price.numeric'         => 'Harga harus berupa angka.',
            'price.min'             => 'Harga tidak boleh kurang dari 0.',
            'link.required'         => 'Link wajib diisi.',
            'link.url'              => 'Link harus berupa URL yang valid.',
            'poster_image.required' => 'Gambar poster wajib diunggah.',
            'poster_image.image'    => 'File harus berupa gambar.',
            'poster_image.mimes'    => 'Format gambar harus jpg, jpeg, png, atau webp.',
            'poster_image.max'      => 'Ukuran gambar maksimal 10MB.',
        ];
    }
}
