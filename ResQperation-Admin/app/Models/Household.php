<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
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
=======

class Household extends Model
{
    // This tells Laravel to look for "household" instead of "households"
    protected $table = 'household'; 

    // If your primary key in the DB is not "id" (e.g., HouseholdID), add this:
    // protected $primaryKey = 'id'; 
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
}