<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Household extends Model
{
    protected $table = 'Household';
    protected $primaryKey = 'HouseholdID';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function members(): HasMany
    {
        return $this->hasMany(HouseholdMember::class, 'HouseholdID', 'HouseholdID');
    }
}