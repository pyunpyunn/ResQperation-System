<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    /**
     * Customize the response.
     */
    public function with(Request $request): array
    {
        return [
            'status' => 'success',
            'timestamp' => now()->format(config('api.timestamp_format', 'Y-m-d\TH:i:s\Z')),
        ];
    }
}
