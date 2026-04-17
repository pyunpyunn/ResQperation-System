<?php

namespace App\Traits;

use App\Http\Responses\ApiResponse;

/**
 * Trait for controllers to easily return API responses
 * 
 * Usage in controllers:
 *   return $this->responseSuccess($data, 'Resource created successfully', 201);
 *   return $this->responseError('Validation failed', 422, $errors);
 */
trait HasApiResponses
{
    /**
     * Return success response.
     */
    protected function responseSuccess($data = null, string $message = 'Success', int $statusCode = 200)
    {
        return ApiResponse::success($data, $message, $statusCode);
    }

    /**
     * Return error response.
     */
    protected function responseError(string $message = 'An error occurred', int $statusCode = 400, $errors = null)
    {
        return ApiResponse::error($message, $statusCode, $errors);
    }

    /**
     * Return paginated response.
     */
    protected function responsePaginated($paginator, string $message = 'Data retrieved successfully')
    {
        return ApiResponse::paginated($paginator, $message);
    }
}
