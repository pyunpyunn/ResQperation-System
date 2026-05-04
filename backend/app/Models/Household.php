<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Household extends Model
{
    protected $table = 'households';
    protected $primaryKey = 'household_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    protected $guarded = [];

    public function members(): HasMany
    {
        return $this->hasMany(HouseholdMember::class, 'household_id', 'household_id');
    }
}
