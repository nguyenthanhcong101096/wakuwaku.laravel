@extends('layouts.application')
@section('title', 'WakuWaku media for vistor')
@section('body')
<div class="main">
  <div class="section--advertise u-text-center">
    <figure class="container">
      <img class="lazy" data-src="https://www.brandsvietnam.com/upload/news/480px/2017/11750_Tiki.png"  alt="advertise">
    </figure>
  </div>

  <div class="section--md">
    <div class="container">
      <div class="list-scroll-wrapper">
        <ul class="list-scroll list--inline">
          <% Tag.with_translation.with_kind('main').each do |tag| %>
          <li class="list-scroll__item"><%= link_to tag.name, tag_path(tag), class: 'list-scroll__link' %></li>
          <% end %>
        </ul>
      </div>
    </div>
  </div>

   <div class="section--lg">
    <div class="container container-fluid">
      <div class="row row-sparse row-sparse-not-pc">
        <div class="col-md-12 col-lg-6">
          @include('shared.post', ['post'=>$presenter->randomAdvertisings()->first(), 'klass'=>'card--xl'])
        </div>
        <div class="col-lg-6">
          <div class="row card-group card-group--mainvisual equal-height">
            @foreach($presenter->latestFourPosts() as $post)
              <div class="col-md-6 card-group__item">
                @include('shared.post', ['post'=>$post, 'klass'=>'card--md'])
              </div>
            @endforeach
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section--lg">
    <div class="container">
      <div class="section-headline">
        <h2 class="headline--md">Area Information</h2>
      </div>
      <div class="row card-group card-group--area-information equal-height">
        @foreach($presenter->fourAreaInformation() as $post)
          <div class="col-md-6 col-lg-3 card-group__item">
            @include('shared.post', ['post'=>$post, 'klass'=>'card--md'])
          </div>
        @endforeach
      </div>
    </div>
  </div>
{{--
  <div class="section--lg">
    <div class="container">
      <div class="row row-sparse row-sparse-not-pc">
        <div class="col-md-12 col-lg-7">
          <div class="section-headline">
            <h2 class="headline--md"><%= t('.latest_articles') %></h2>
          </div>
          <%= render partial: 'posts/post', collection: @presenter.block_eight_posts, locals: { horizontal: true, klass: 'card--default' } %>
        </div>
        <div class="col-md-12 offset-lg-1 col-lg-4">
          <div class="section-headline">
            <h2 class="headline--md"><%= t('.popular') %></h2>
          </div>
          <div class="row row-sparse row-sparse-not-tb">
            <div class="col-md-8 col-lg-12 card-ranking-wrap">
              <%= render partial: 'posts/post', collection: @presenter.ranking, locals: { horizontal: true, klass: 'card--sm' } %>
            </div>
            <div class="col-8 offset-2 col-md-4 offset-md-0 col-lg-12 u-hidden-tablet">
              <div class="sticky">
                <%= render 'shared/panel_advertising' %>
              </div>
            </div>
          </div>
          <div class="sticky u-mt-40 u-hidden-not-lg">
            <%= render 'shared/panel_advertising' %>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section--lg">
    <div class="container">
      <div class="section-headline">
        <h2 class="headline--md"><%= t('.recap') %></h2>
      </div>
      <div class="row row-sparse row-sparse-not-tb row-sparse-not-pc equal-height">
        <% @presenter.random_advertisings.each do |post| %>
          <div class="col-md-6">
            <%= render 'posts/post', post: post, klass: 'card--lg' %>
          </div>
        <% end %>
      </div>
    </div>
  </div>

  <div class="section--lg">
    <div class="container">
      <div class="row row-sparse row-sparse-not-pc">
        <div class="col-md-12 offset-lg-1 col-lg-4">
          <div class="section-headline">
            <h2 class="headline--md"><%= t('.recommendation') %></h2>
          </div>
          <div class="row row-sparse row-sparse-not-tb">
            <div class="col-md-8 col-lg-12">
              <%= render partial: 'posts/post', collection: @recommend, locals: { horizontal: true, klass: 'card--sm' } %>
            </div>
            <div class="col-8 offset-2 col-md-4 offset-md-0 col-lg-12 u-hidden-tablet u-hidden-sm">
              <div class="sticky js-panel-advertising">
                <%= render 'shared/panel_advertising' %>
              </div>
            </div>
          </div>
          <div class="sticky u-mt-40 u-hidden-not-lg js-panel-advertising">
            <%= render 'shared/panel_advertising' %>
          </div>
        </div>
        <div class="col-md-12 col-lg-7 order-lg-first js-container-load-more">
          <%= render partial: 'posts/post', collection: @presenter.next_block_eight_posts, locals: { horizontal: true,  klass: 'card--default' } %>
        </div>
      </div>
    </div>
  </div>

  <div class="section--lg u-text-center">
    <div class="container">
      <button class="btn btn--red btn--md js-btn-load-more-6s2i u-mb-40" data-load-more="<%= @presenter.meta_data.to_json %>"><%= t('.see_more') %></button>
      <div class="row u-hidden-tablet">
        <div class="col-8 offset-2 js-panel-advertising">
          <%= render 'shared/panel_advertising' %>
        </div>
      </div>
    </div>
  </div> --}}
</div>
@endsection
