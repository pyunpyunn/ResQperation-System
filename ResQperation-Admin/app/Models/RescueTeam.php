<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RescueTeam extends Model
{
    protected $table = 'RescueTeam';
    protected $primaryKey = 'TeamID';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
