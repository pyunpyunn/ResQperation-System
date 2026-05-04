<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncomingRequest extends Model
{
    protected $table = 'resource_requests';
    protected $primaryKey = 'request_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    protected $guarded = [];

    public function status(): BelongsTo
    {
        return $this->belongsTo(StatusLookup::class, 'status_id', 'status_id');
    }
}
