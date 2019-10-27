<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function postable(){
        return $this->morphTo();
    }

    public function comments(){
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function post_translations(){
        return $this->hasMany(PostTranslation::class);
    }

    public function taggings(){
        return $this->hasMany(Tagging::class);
    }

    public function tags(){
        return $this->hasManyThrough(Tag::class, Tagging::class, 'tag_id', 'id');
    }

    public function scopeWithPostTranslation($query, $locale=null){
        $subs  = PostTranslation::withLocale($locale);
        $posts = $query->joinSub($subs, 'post_translations', function($join){ $join->on('posts.id', '=', 'post_translations.post_id'); })
                ->select('posts.*', 'post_translations.title', 'post_translations.description', 'post_translations.content', 'post_translations.locale', 'post_translations.status', 'post_translations.count_submit');
        return $posts;
    }

    public function scopeWithCategory($query, $cate){
        return $query->where('category', $cate);
    }

    public function scopeWithNotCategory($query, $cate){
        return $query->where('category','<>', $cate);
    }

    public function scopeWithArea($query, $locale=null){
        $translations = PostTranslation::withLocale($locale);
        $query = $query->joinSub(Tag::withKind('area', $locale), 'tags', function($join){ $join->on('posts.id', '=', 'tags.post_id');});
        $query = $query->joinSub($translations, 'post_translations', function($join){ $join->on('posts.id', '=', 'post_translations.post_id');});
        return $query;
    }
}
