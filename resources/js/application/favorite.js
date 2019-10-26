import axios from 'axios'
import { delegate } from 'rails-ujs'
import { isUserSignedIn } from './common'

const switchBtn = (postId, { name, type }) => {
  const btns = document.querySelectorAll(`${name}[data-post-id='${postId}']`)

  Array.prototype.slice.call(btns).forEach(btn => {
    btn.disabled = false

    if (type === 'favorite') {
      btn.classList.add('is-saved', 'js-btn-unfavorite')
      btn.classList.remove('js-btn-favorite')
    } else {
      btn.classList.remove('is-saved', 'js-btn-unfavorite')
      btn.classList.add('js-btn-favorite')
    }
  })
}

export const onClickBtnUnfavorite = () => {
  delegate(document, '.js-btn-unfavorite', 'click', event => {
    if (!isUserSignedIn()) return

    const btn = event.target
    const postId = btn.getAttribute('data-post-id')
    if (!postId) return

    btn.disabled = true

    axios.delete(`/favorites/${postId}`)
      .then(response => {
        switchBtn(postId, { name: '.js-btn-unfavorite', type: 'unfavorite' })

        return response
      })
      .catch(() => { btn.disabled = false })
  })
}

export const onClickBtnFavorite = () => {
  delegate(document, '.js-btn-favorite', 'click', event => {
    if (!isUserSignedIn()) return

    const btn = event.target
    const postId = btn.getAttribute('data-post-id')
    if (!postId) return

    btn.disabled = true

    axios.post('/favorites', { post_id: postId })
      .then(response => {
        switchBtn(postId, { name: '.js-btn-favorite', type: 'favorite' })

        return response
      })
      .catch(() => { btn.disabled = false })
  })
}
