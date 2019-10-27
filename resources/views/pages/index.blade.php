@extends('layouts.application')
@section('title', 'WakuWaku media for vistor')
@section('body')
@each('shared.post', $posts, 'post')
@endsection
