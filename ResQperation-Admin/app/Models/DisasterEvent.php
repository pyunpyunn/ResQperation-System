<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DisasterEvent extends Model
{
    protected $table = 'DisasterEvent';
    protected $primaryKey = 'DisasterID';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function severity(): BelongsTo
    {
        return $this->belongsTo(SeverityLevel::class, 'SeverityID', 'SeverityID');
    }
}
