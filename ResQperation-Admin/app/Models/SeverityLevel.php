<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeverityLevel extends Model
{
    protected $table = 'SeverityLevel';
    protected $primaryKey = 'SeverityID';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
