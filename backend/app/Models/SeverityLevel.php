<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeverityLevel extends Model
{
    protected $table = 'severity_levels';
    protected $primaryKey = 'severity_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
