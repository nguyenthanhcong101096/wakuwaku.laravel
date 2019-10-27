<section class="section--sm">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3">
        <div class="comments">
          <h3 class="headline--sm u-mb-16"><span class="js-comments-count">{{ $post->comments_count }}</span> Comments</h3>
          <textarea class="form-control form-textarea u-w-full js-comment-box" aria-label="Textarea" maxlength="500" placeholder="Input your comment"></textarea>
          <div class="comments__action">
            <span class="u-text-tertiary"></span>
            <button type="button" class="btn btn--default js-btn-comment-create" data-post-id="<%= post.id %>">Comments</button>
          </div>
          <div class="js-comment-latest u-mb-16"></div>
          <div class="comments__body js-comments-body">
            @each('posts.comment', $comments, 'comment')
          </div>
          @if($post->comments_count > 5)
            <div class="u-text-center u-mt-32">
              <button type="button" class="btn btn--default js-btn-comment-load-more" data-post-id="{{$post->id }}" data-comment-max-id="{{ $comments->last()->id }}">See More Comment</button>
            </div>
          @endif
        </div>
      </div>
    </div>
  </div>
</section>
  