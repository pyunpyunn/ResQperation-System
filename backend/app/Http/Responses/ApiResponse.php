<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    /**
     * Return a success response.
     *
     * @param  mixed  $data
     * @param  string  $message
     * @param  int  $statusCode
     */
    public static function success($data = null, string $message = 'Success', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'timestamp' => now()->format(config('api.timestamp_format', 'Y-m-d\TH:i:s\Z')),
        ], $statusCode);
    }

    /**
     * Return an error response.
     *
     * @param  string  $message
     * @param  int  $statusCode
     * @param  mixed  $errors
     */
    public static function error(string $message = 'An error occurred', int $statusCode = 400, $errors = null): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
            'timestamp' => now()->format(config('api.timestamp_format', 'Y-m-d\TH:i:s\Z')),
        ], $statusCode);
    }

    /**
     * Return a paginated response.
     *
     * @param  mixed  $paginator
     * @param  string  $message
     */
    public static function paginated($paginator, string $message = 'Data retrieved successfully'): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $paginator->items(),
            'pagination' => [
                'total' => $paginator->total(),
                'count' => $paginator->count(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'total_pages' => $paginator->lastPage(),
                'has_more_pages' => $paginator->hasMorePages(),
            ],
            'timestamp' => now()->format(config('api.timestamp_format', 'Y-m-d\TH:i:s\Z')),
        ], 200);
    }
}
