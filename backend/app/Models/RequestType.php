<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestType extends Model
{
    protected $table = 'field_report_categories';
    protected $primaryKey = 'category_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
}
