<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Responder extends Model
{
    protected $table = 'Responder';
    protected $primaryKey = 'ResponderID';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function team(): BelongsTo
    {
        return $this->belongsTo(RescueTeam::class, 'TeamID', 'TeamID');
    }
}
