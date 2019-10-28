<div class="comment js-comment">
  <div class="tile tile--md tile--horizontal is-straight">
    <figure>
      <img alt="user avatar" class="lazy tile__icon" data-src="https://znews-photo.zadn.vn/w660/Uploaded/kcwvouvs/2017_08_15/16906791_757431121087511_3403161025392934912_n_1.jpg">
    </figure>
    <div class="tile__content comment__content">
      @if(userSignIn())
      <div class="comment__action js-comment-action">
        <ul class="comment__dropdown">
          @if(currentUser()->isComment($comment->id))
          <li class="js-comment-delete" data-comment-id="{{ $comment->id }}">@svg('new/ico_delete', ['width'=>'16px', 'height'=>'16px', 'color'=>'#3b599'])Delete</li>
          @else
          <li data-comment-id="{{$comment->id}}">@svg('new/ico_report', ['width'=>'16px', 'height'=>'16px', 'color'=>'#3b5997'])Report</li>
          @endif
        </ul>
      </div>
      @endif
      <p class="tile__title comment__title">
      <span>{{$comment->userable->name}}</span>
      <span class="u-text-tertiary u-d-inline-block">10/10/2019</span>
      </p>
      <p class="u-break-word">{!!$comment->message!!}</p>
    </div>
  </div>
</div>
  