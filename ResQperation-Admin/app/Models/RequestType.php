<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestType extends Model
{
    protected $table = 'RequestType';
    protected $primaryKey = 'RequestTypeID';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
