<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BioTag extends Model
{
    use HasFactory;
    protected $table = 'bio_tag';

    protected $fillable = [
        'bio_id',
        'tag_id',
    ];

    public function bio()
    {
        return $this->belongsTo(Bio::class);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
