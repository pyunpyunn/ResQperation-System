<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DisasterType extends Model
{
    protected $table = 'disaster_types';
    protected $primaryKey = 'type_id';
    public $timestamps = true;
    protected $guarded = [];

    public function severity(): BelongsTo
    {
        return $this->belongsTo(SeverityLevel::class, 'severity_level', 'severity_id');
    }
}
