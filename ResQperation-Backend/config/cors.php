<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure CORS settings for your application. CORS allows
    | controlled access to your API from different origins (mobile apps, web apps).
    |
    */

    /*
    | Paths that should be protected by CORS middleware
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    /*
    | Methods that are allowed for CORS requests
    */
    'allowed_methods' => ['*'],

    /*
    | Origins allowed to access your API
    | For mobile apps: Use your app's deeplink (scheme) or the domain
    | For web apps: Use the actual domain
    */
    'allowed_origins' => explode(',', env(
        'CORS_ALLOWED_ORIGINS',
        'http://localhost:3000,http://localhost:5173'
    )),

    /*
    | Patterns for allowed origins (regex supported)
    | Useful for matching all subdomains or multiple environments
    */
    'allowed_origins_patterns' => [],

    /*
    | Headers that clients are allowed to send
    */
    'allowed_headers' => ['*'],

    /*
    | Headers exposed to the client
    */
    'exposed_headers' => [],

    /*
    | Maximum age for preflight requests (in seconds)
    | 24 hours by default
    */
    'max_age' => 86400,

    /*
    | Whether credentials (cookies, authorization headers) should be allowed
    */
    'supports_credentials' => true,

];
