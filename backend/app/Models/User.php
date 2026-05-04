<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Hidden(['password'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'name',
        'username',
        'email',
        'password',
        'role_id',
        'contact_number',
        'assigned_center_id',
        'household_id',
        'is_active',
    ];

    public const ROLE_ADMIN = 'admin';
    public const ROLE_SUPER_ADMIN = 'super_admin';
    public const ROLE_RESCUER = 'rescuer';
    public const ROLE_HOUSEHOLD_RESIDENT = 'household_resident';

    /**
     * Tells Laravel to use 'username' for authentication instead of 'email'.
     */
    public function username(): string
    {
        return 'username';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    public function roleKey(): ?string
    {
        return $this->role?->role_key;
    }

    public function isAdmin(): bool
    {
        return $this->roleKey() === self::ROLE_ADMIN;
    }

    public function isSuperAdmin(): bool
    {
        return $this->roleKey() === self::ROLE_SUPER_ADMIN;
    }

    public function isRescuer(): bool
    {
        return $this->roleKey() === self::ROLE_RESCUER;
    }

    public function isHouseholdResident(): bool
    {
        return $this->roleKey() === self::ROLE_HOUSEHOLD_RESIDENT;
    }

    public function landingRouteName(): string
    {
        return $this->isSuperAdmin() ? 'super-admin.dashboard' : 'dashboard';
    }
}
