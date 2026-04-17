<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncomingRequest extends Model
{
    protected $table = 'IncomingRequest';
    protected $primaryKey = 'RequestID';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function status(): BelongsTo
    {
        return $this->belongsTo(StatusLookup::class, 'StatusID', 'StatusID');
    }

    public function requestType(): BelongsTo
    {
        return $this->belongsTo(RequestType::class, 'RequestTypeID', 'RequestTypeID');
    }
}
