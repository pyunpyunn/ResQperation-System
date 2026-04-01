<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    // This tells Laravel to look for "household" instead of "households"
    protected $table = 'household'; 

    // If your primary key in the DB is not "id" (e.g., HouseholdID), add this:
    // protected $primaryKey = 'id'; 
}