<?php

namespace App\Http\Requests\Class;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClassRequest extends FormRequest
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
            'name'         => ['required', 'string', 'max:255'],
            'color'        => ['required', 'string', 'max:7'],
            'poster_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10066'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'      => 'Nama kelas wajib diisi.',
            'color.required'     => 'Warna wajib dipilih.',
            'poster_image.image' => 'File harus berupa gambar.',
            'poster_image.mimes' => 'Format gambar harus jpg, jpeg, png, atau webp.',
            'poster_image.max'   => 'Ukuran gambar maksimal 10MB.',
        ];
    }
}
