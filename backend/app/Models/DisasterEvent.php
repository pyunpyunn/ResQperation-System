<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DisasterEvent extends Model
{
    protected $table = 'disaster_events';
    protected $primaryKey = 'event_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    protected $guarded = [];

    public function type(): BelongsTo
    {
        return $this->belongsTo(DisasterType::class, 'type_id', 'type_id');
    }
}
