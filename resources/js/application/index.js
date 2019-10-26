import Rails from 'rails-ujs'
import axios from 'axios'
import LazyLoad from 'vanilla-lazyload'
import Cropper from '../common/cropper'
import QuillEditor from '../common/QuillEditor'

import * as Form from '../common/form'
import * as Common from './common'
import * as Dropdown from './dropdown'
import * as Header from './header'
import * as Follow from './follow'
import * as LoadMore from './load_more'
import * as Favorite from './favorite'
import * as Modal from '../common/modal'
import * as Tab from './tab'
import * as Like from './like'
import * as Comment from './comment'

import { onScrollPostPage } from './post_view'
import { onClickBtnCloseToast } from '../common/common'

// Config lib's default options
axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.headers.common['Accept'] = 'application/json'

Rails.start()

window.addEventListener('DOMContentLoaded', function () {
  window.clickType = document.ontouchstart !== null ? 'click' : 'touchstart'

  window.addEventListener('resize', () => {
    window.clickType = window.innerWidth > 767 ? 'click' : window.clickType
  })

  Header.onToggleHeader()
  Header.onScrollHeader()

  Dropdown.onOpenDropdown()
  Dropdown.onCloseDropdown()

  Common.onChangeLocale()

  Follow.onClickBtnFollow()
  Follow.onClickBtnUnfollow()

  LoadMore.onClickBtnLoadMore6S2I()

  Favorite.onClickBtnFavorite()
  Favorite.onClickBtnUnfavorite()

  Tab.onChangeTab()

  Modal.onOpenModal()
  Modal.onCloseModal()

  Like.onClickBtnLike()

  Comment.onClickBtnCommentLoadmore()
  Comment.onHandleCommentCreate()
  Comment.onClickCommentDropdown()
  Comment.onClickCommentDelete()

  Form.onHandleFormOther()

  onScrollPostPage()
  onClickBtnCloseToast()

  const formAvatar = document.querySelector('.js-input-avatar')
  if (formAvatar) new Cropper()._initCroppie()

  const postContentQuill = document.getElementById('post-content-quill')
  if (postContentQuill) {
    let editor = new QuillEditor(postContentQuill, true)
    editor.quill.setContents({
      'ops': window.wakuPost
    })
    editor.quill.disable()
  }

  // Lazyload background images
  window.myLazyLoad = new LazyLoad({
    elements_selector: '.lazy'
  })
})
