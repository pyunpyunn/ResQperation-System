<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RescueTeam extends Model
{
    protected $table = 'rescue_teams';
    protected $primaryKey = 'team_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
