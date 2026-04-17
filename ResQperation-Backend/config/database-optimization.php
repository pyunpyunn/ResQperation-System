<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Database Configuration - Production Optimizations
    |--------------------------------------------------------------------------
    |
    | These settings optimize database performance and reliability
    | for production environments.
    |
    */

    /*
    | Connection pooling and persistence
    | Set persistent to true for long-lived connections (use with care)
    */
    'connections' => [
        'persist' => env('DB_PERSIST', false),
        'pool' => [
            'min' => env('DB_POOL_MIN', 1),
            'max' => env('DB_POOL_MAX', 5),
        ],
    ],

    /*
    | Query timeouts (in seconds)
    | Prevents long-running queries from blocking the application
    */
    'timeout' => env('DB_TIMEOUT', 60),

    /*
    | Connection retry configuration
    */
    'retry' => [
        'attempts' => env('DB_RETRY_ATTEMPTS', 3),
        'delay' => env('DB_RETRY_DELAY', 1000), // milliseconds
    ],

    /*
    | Query logging (useful for optimization)
    | Set to false in production if not using a log service
    */
    'log_queries' => env('DB_LOG_QUERIES', env('APP_DEBUG', false)),

    /*
    | Explain queries that take longer than this duration (in milliseconds)
    | Set to 0 to disable
    */
    'explain_slow_queries' => env('DB_EXPLAIN_SLOW_QUERIES', 0),

];
