<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseholdMember extends Model
{
    protected $table = 'HouseholdMember';
    protected $primaryKey = 'MemberID';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
