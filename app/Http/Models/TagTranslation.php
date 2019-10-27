<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class TagTranslation extends Model
{
    public function tag(){
        return $this->belongsTo(Tag::class);
    }

    public function scopeWithLocale($query, $locale){
        $arr_locales = array_flip(config('app.locales'));

        if(is_array($locale) || in_array($locale, $arr_locales)){
            return $query->where('locale', $locale);
        }elseif($locale) { 
            return $query->whereRaw($locale);
        }else{
            return $query->where('locale', App::getLocale());
        }
    }
}
