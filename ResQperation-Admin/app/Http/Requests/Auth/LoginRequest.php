<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
<<<<<<< HEAD
=======
    /**
     * Determine if the user is authorized to make this request.
     */
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
    public function authorize(): bool
    {
        return true;
    }

<<<<<<< HEAD
    public function rules(): array
    {
        return [
            'login' => ['required', 'string'],
=======
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
            'password' => ['required', 'string'],
        ];
    }

<<<<<<< HEAD
=======
    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws ValidationException
     */
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

<<<<<<< HEAD
        $credentials = ['password' => $this->input('password')];
        $loginValue = $this->input('login');

        $attempts = [
            array_merge($credentials, ['email' => $loginValue]),
            array_merge($credentials, ['name' => $loginValue]),
        ];

        $authenticated = false;

        foreach ($attempts as $credentials) {
            if (Auth::attempt($credentials, $this->boolean('remember'))) {
                $authenticated = true;
                break;
            }
        }

        if (! $authenticated) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'login' => trans('auth.failed'),
=======
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

<<<<<<< HEAD
=======
    /**
     * Ensure the login request is not rate limited.
     *
     * @throws ValidationException
     */
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
<<<<<<< HEAD
            'login' => trans('auth.throttle', [
=======
            'email' => trans('auth.throttle', [
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

<<<<<<< HEAD
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('login')).'|'.$this->ip());
=======
    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
    }
}
