@extends('layouts.application')
@section('title', 'Chi tiết bài viết')
@section('head')
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<script>
  window.wakuPost = {!! $post->content !!}
</script>
@endsection

@section('body')
<div id="js-main" class="main">
  <div class="section--md">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="post-wrapper">
            <figure>
              <img class="post-wrapper-img" src="https://s3.ap-northeast-1.amazonaws.com/wakuwaku.today/uploads/store/4fbf0894f3c689eb9cd43a520aea74c9.jpeg">
            </figure>
            <div class="post-wrapper__content u-mb-32 u-mt-32">
              <p class="u-text-sm u-text-notice u-text-center u-text-bold u-mb-8">Tag name</p>
              <h1 class="u-mb-16 u-text-center headline--xl">{!!$post->title!!}</h1>
              <h3 class="u-mb-32 u-text-center post-subtitle">{{$post->description}}</h3>
              <div class="tile-wrapper">
                <div class="tile tile--md tile--horizontal">
                  <figure>
                    <img class="tile__icon lazy" data-src="https://znews-photo.zadn.vn/w660/Uploaded/kcwvouvs/2017_08_15/16906791_757431121087511_3403161025392934912_n_1.jpg" >
                  </figure>
                  <div class="tile__content">
                    <p class="tile__title">Thanh Cong</p>
                    <span class="u-text-sm u-text-gray-700">20/10/2019</span>
                  </div>
                </div>
                {{-- <%= btn_favorite(@post.id, 'btn-group__item') %> --}}
              </div>
            </div>
            <div class="post-wrapper__content clearfix">
              <div class="post-sidebar js-post-like">
                {{-- <%= btn_like(@post) %> --}}
                <p class="js-post-like-count">{{ $post->likes_count }}</p>
                {{-- <%= btn_favorite(@post.id, 'u-mt-16 u-mb-16') %> --}}
                <div class="post-sns">
                {{-- <%= social_share(@post, '20px', 'btn-group__item') %> --}}
                </div>
              </div>
              <div id="post-content-quill" class="post js-post" data-post-id="{{$post->id }}"></div>
              <figure>
                <img class="u-mt-32 lazy" data-src="{{ asset('images/new/ads/ads2.png') }}" alt="advertise">
              </figure>
              <div class="tag u-mt-32">
                @foreach($tags as $tag)
                  <a class="tag__item">{{$tag->tagName}}</a>
                @endforeach
              </div>
              <div class="post-btn">
                <div class="btn-group btn-group--md">
                  <div class="btn-group__item js-post-like">
                    {{-- <%= btn_like(@post) %> --}}
                    <span class="js-post-like-count">{{ $post->likes_count }}</span>
                  </div>
                  {{-- <%= btn_favorite(@post.id, 'btn-group__item') %> --}}
                </div>
                <div class="btn-group btn-group--lg post-sns">
                  {{-- <%= social_share(@post, '20px', 'btn-group__item') %> --}}
                </div>
              </div>
              @if(auth()->user()->isAuthor($post))
                <div class="tile-wrapper tile-wrapper--box">
                  <div class="tile tile--sm tile--horizontal">
                    <a><figure><img class="tile__icon" src="https://znews-photo.zadn.vn/w660/Uploaded/kcwvouvs/2017_08_15/16906791_757431121087511_3403161025392934912_n_1.jpg"></figure></a>
                    <div class="tile__content">
                      <p class="tile__title">{{$post->postable->name}}</p>
                      <p>Đá hỏng 2 quả 11 m, MU vẫn thắng Norwich 3-1</p>
                    </div>
                  </div>
                  {{-- <%= btn_follow(@post.postable_id) unless current_user&.id == @post.postable_id %> --}}
                </div>
              @endif
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="section--divider"></div>
  </div>

  @include('posts.comments', ['post'=>$post, 'comments'=>$post->comments->take(5)])

  <div class="container">
    <div class="section--divider"></div>
  </div>

  <div class="section--sm">
    <div class="container">
      <h3 class="headline--sm u-mb-16">From same Author</h3>
      <div class="row row-sparse row-sparse-not-pc row-sparse-not-tb equal-height">
        @foreach($authPost as $p)
          <div class="col-12 col-md-4 card-group__item">
            @include('shared.post', ['post'=>$p, 'klass'=>'card--md'])
          </div>
        @endforeach
        <figure class="u-w-full u-mt-32 u-text-center">
          <img class="lazy" data-src="{{ asset('images/new/ads/ads2.png') }}" alt="advertise">
        </figure>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="section--divider"></div>
  </div>

  <section class="section--lg">
    <div class="container">
      <h3 class="headline--sm u-mb-16">Other also read</h3>
      <div class="row">
        <div class="col-12 col-md-8 js-container-load-more">
          @foreach($authPost as $p)
            @include('shared.post', ['post'=>$p, 'klass'=>'card--default', 'horizontal'=>true])
          @endforeach
        </div>
        <figure class="col-12 col-md-4 u-hidden-mb">
          <img class="lazy" data-src="{{asset('images/new/ads/ads4.png')}}" alt="advertise">
        </figure>
      </div>
    </div>
  </section>

  <section class="section--lg u-text-center">
    <div class="container">
      <button class="btn btn--red btn--md js-btn-load-more-6s2i" data-type-post="recommed" data-load-more="meta_data.to_json ">See more</button>
    </div>
  </section> 
</div>
@endsection
