<?php

function button_follow($writer, $klass=null){
  if(userSignIn() && currentUser()->isFollow($writer)){
    return Form::button('Unfollow',['class'=>'btn btn--default btn-follow is-following js-btn-unfollow '.$klass, 'data-writer-id'=>$writer->id]);
  }else{
    return Form::button('Follow',['class'=>'btn btn--red btn-follow js-btn-follow '.$klass, 'data-writer-id'=>$writer->id]);
  }
}
