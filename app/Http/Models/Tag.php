<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function taggings(){
        return $this->hasMany(Tagging::class);
    }

    public function tag_translations(){
        return $this->hasMany(TagTranslation::class);
    }

    public function posts(){
        return $this->hasManyThrough(Post::class, Tagging::class, 'post_id', 'id');
    }

    public function scopeWithTranslation($query, $locale='en'){
        $subs = TagTranslation::withLocale($locale);
        $tags = $query->joinSub($subs, 'tag_translations', function($join){ $join->on('tags.id', '=', 'tag_translations.tag_id');})
                      ->select('tags.*', 'tag_translations.name as tagName');
        return $tags;
    }

    public function scopeWithKind($query, $kind, $locale=null){
        return $query->join('taggings', 'tags.id', '=', 'taggings.tag_id')->where('kind', $kind)
                     ->withTranslation($locale)
                     ->select('taggings.post_id');
    }
}
