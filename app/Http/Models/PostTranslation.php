<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class PostTranslation extends Model
{
    public function authorable(){
        return $this->morphTo();
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function scopeWithLocale($query, $locale=null){
        $arr_locales = array_flip(config('app.locales'));
        if(is_array($locale) || in_array($locale, $arr_locales)){
            return $query->where('locale', $locale);
        } elseif($locale){
            return $query->whereRaw($locale);
        } else {
            return $query->where('locale', App::getLocale());
        }
    }
}
