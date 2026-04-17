<?php

return [

    /*
    |--------------------------------------------------------------------------
    | API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for API versioning, response formatting, and pagination.
    |
    */

    /*
    | Current API Version
    */
    'version' => env('API_VERSION', 'v1'),

    /*
    | API prefix for all routes
    */
    'prefix' => env('API_PREFIX', 'api'),

    /*
    | Pagination defaults
    */
    'pagination' => [
        'per_page' => env('API_PAGINATION_PER_PAGE', 15),
        'max_per_page' => env('API_PAGINATION_MAX_PER_PAGE', 100),
    ],

    /*
    | Rate limiting
    */
    'rate_limit' => [
        'enabled' => env('API_RATE_LIMIT_ENABLED', true),
        'requests' => env('API_RATE_LIMIT_REQUESTS', 60),
        'period' => env('API_RATE_LIMIT_PERIOD', 1), // in minutes
    ],

    /*
    | Response formatting
    | Supported: 'json-api', 'json', 'laravel'
    */
    'response_format' => env('API_RESPONSE_FORMAT', 'json'),

    /*
    | Timestamp format for API responses
    */
    'timestamp_format' => 'Y-m-d\TH:i:s\Z',

];
