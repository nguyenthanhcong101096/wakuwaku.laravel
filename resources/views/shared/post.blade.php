@php
  $class_horizontal = isset($usersType) ? 'card--horizonal' : '';
  $class_options    = $klass ?? $klass;
@endphp

<div class="card {{$class_options}} {{$class_horizontal}}">
  <a href="" class="card__image">
    <div class="lazy" data-src="https://s3.ap-northeast-1.amazonaws.com/wakuwaku.today/uploads/store/4fbf0894f3c689eb9cd43a520aea74c9.jpeg"></div>
  </a>
  <div class="card__content">
    <div class="card__text">
      <div class="card__sub">
        <span>{{$post->category}}</span>
        <span>10/10/2019</span>
      </div>
      <a href="" class="card__title">{{$post->title}}</a>
    </div>
    <div class="card__action">
      <ul class="list--inline">
        <li class="card__author">
          <a>{{hello('nguyen thanh cong')}}</a>
        </li>
        <li>
          <span class="card__like">{{$post->likes_count}}</span>
          <span class="card__comment">{{$post->comments_count}}</span>
        </li>
      </ul>
      {{-- <%= btn_favorite(post.id) %> --}}
    </div>
  </div>
</div>
