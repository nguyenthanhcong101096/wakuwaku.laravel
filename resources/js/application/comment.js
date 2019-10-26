import axios from 'axios'
import { delegate } from 'rails-ujs'
import { closest, removeClass, getSiblings, sanitizeValue, onHandleCountChange } from '../common/util'
import { isUserSignedIn } from './common'

export const onClickBtnCommentLoadmore = () => {
  const btnCommentLoadMore = document.querySelector('.js-btn-comment-load-more')
  const commentBody = document.querySelector('.js-comments-body')
  if (!btnCommentLoadMore || !commentBody) return

  btnCommentLoadMore.addEventListener('click', () => {
    const maxCommentId = btnCommentLoadMore.getAttribute('data-comment-max-id')
    const postId = btnCommentLoadMore.getAttribute('data-post-id')
    if (!postId || !maxCommentId) return

    axios.get('/comments', { params: { post_id: postId, max_id: maxCommentId } })
      .then(response => {
        response.data.comments.forEach(comment => {
          commentBody.insertAdjacentHTML('beforeend', comment)
        })

        window.myLazyLoad.update()
        btnCommentLoadMore.setAttribute('data-comment-max-id', response.data.max_id)

        if (response.data.max_id === response.data.post_comments_max_id) { btnCommentLoadMore.remove() }

        return response
      })
      .catch(error => { throw error })
  })
}

export const onHandleCommentCreate = () => {
  const btnCreateComment = document.querySelector('.js-btn-comment-create')
  const commentBox = document.querySelector('.js-comment-box')
  const commentBody = document.querySelector('.js-comments-body')
  if (!btnCreateComment || !commentBox || !commentBody) return

  btnCreateComment.addEventListener('click', () => {
    createComment()
  })

  commentBox.addEventListener('keydown', event => {
    if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey) createComment()
  })

  function createComment() {
    const message = sanitizeValue(commentBox.value.trim()).replace(/\r?\n/g, '<br />')
    if (message === '') {
      commentBox.value = ''
      return
    }

    const postId = btnCreateComment.getAttribute('data-post-id')
    if (!isUserSignedIn() || message.length > 500 || !postId) return

    axios.post('/comments', { post_id: postId, message: message })
      .then(response => {
        commentBox.value = ''
        onHandleCountChange({ el: '.js-comments-count' })
        commentBody.insertAdjacentHTML('afterbegin', response.data.comment)
        window.myLazyLoad.update()

        return response
      })
      .catch(error => { throw error })
  }
}

export const onClickCommentDelete = () => {
  delegate(document, '.js-comment-delete', window.clickType, event => {
    const commentId = event.target.getAttribute('data-comment-id')
    if (!commentId) return

    if (window.confirm(window.__INIT_DATA__.I18n.comment.confirm)) {
      axios.delete(`/comments/${commentId}`)
        .then(response => {
          closest(event.target, '.js-comment').remove()
          onHandleCountChange({ num: -1, el: '.js-comments-count' })

          return response
        })
        .catch(error => { throw error })
    }
  })
}

export const onClickCommentDropdown = () => {
  delegate(document, '.js-comment-action', 'click', event => {
    const commentAction = closest(event.target, '.js-comment-action')
    if (!commentAction) return

    getSiblings(closest(event.target, '.js-comment')).map(item => {
      item.querySelector('.js-comment-action').classList.remove('is-active')
    })

    commentAction.classList.toggle('is-active')

    document.addEventListener(window.clickType, event => {
      if (event.target.classList.contains('js-comment-action')) return

      removeClass(commentAction, 'is-active')
    })
  })
}
