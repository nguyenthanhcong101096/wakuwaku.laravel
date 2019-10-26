@extends('layouts.application')
@section('title', 'Login to Waku Waku')
@section('body')
<div class="main">
  <div class="section--lg u-text-center">
    <div class="container">
      <div class="row">
        <div class="col-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
          <div class="u-mt-32 u-mb-32">
            @svg('new/img_logo-waku-news', ['width' => '165px', 'height'=> '48px'])
          </div>

          <h1 class="headline--lg u-mb-32">login</h1>
          <nav class="u-mb-24">
            <a href="/" class="btn btn--sns btn--facebook u-d-block u-mb-16">
              @svg('new/ico_fb-sns', ['width' => '16px', 'height' => '16px']) Login with Facebook
            </a>
            <a href="/" class="btn btn--sns btn--google u-d-block u-mb-16">
              @svg('new/ico_google-sns', ['width' => '16px', 'height' => '16px']) Login with Google
            </a>
            <a href="{{ url('/') }}" class="btn btn--sns btn--twitter u-d-block u-mb-16">
              @svg('new/ico_twitter-sns', ['width' => '16px', 'height' => '16px']) Login with Twitter
            </a>
            <a href="{{url('articles/story')}}" class="btn btn--sns btn--line u-d-block u-mb-16">
              @svg('new/ico_line-sns', ['width' => '16px', 'height' => '16px']) Login with Line
            </a>
            <a href="/" class="btn btn--sns btn--zalo u-d-block u-mb-16">
              @svg('new/ico_zalo-sns', ['width' => '16px', 'height' => '16px']) Login with Zalo
            </a>
          </nav>
          <p class="u-text-sm">By using Wakuwaku. Today, you agree to our Code of Conduct, Privacy Policies.</p>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
