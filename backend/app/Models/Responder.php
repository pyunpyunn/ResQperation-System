<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Responder extends Model
{
    protected $table = 'responders';
    protected $primaryKey = 'responder_id';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function team(): BelongsTo
    {
        return $this->belongsTo(RescueTeam::class, 'team_id', 'team_id');
    }
}
