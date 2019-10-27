<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class TagTranslation extends Model
{
    public function tag(){
        return $this->belongsTo(Tag::class);
    }
}
