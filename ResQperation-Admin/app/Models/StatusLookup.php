<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusLookup extends Model
{
    protected $table = 'StatusLookup';
    protected $primaryKey = 'StatusID';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
