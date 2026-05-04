<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusLookup extends Model
{
    protected $table = 'resource_request_status';
    protected $primaryKey = 'status_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
