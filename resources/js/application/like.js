import axios from 'axios'
import { isUserSignedIn } from './common'

const updateLikeCount = (btn, state) => {
  const postSpan = btn.nextElementSibling
  let likesCount = parseInt(postSpan.textContent)

  likesCount = state === 'created' ? ++likesCount : --likesCount

  return likesCount
}

export const onClickBtnLike = () => {
  const btnLikes = Array.prototype.slice.call(document.querySelectorAll('.js-btn-like'))
  if(!btnLikes.length) return

  btnLikes.forEach(btnLike => {
    btnLike.addEventListener('click', () => {
      if (!isUserSignedIn()) return

      const postId = btnLike.getAttribute('data-post-id')
      if (!postId) return

      btnLike.disabled = true

      axios.post('/likes/like', { post_id: postId })
        .then(response => {
          let likeCount = updateLikeCount(btnLike, response.data.state)

          btnLikes.forEach(btn => {
            btn.disabled = false
            btn.nextElementSibling.innerHTML = likeCount
            response.data.state === 'created' ? btn.classList.add('is-active') : btn.classList.remove('is-active')
          })

          return response
        })
        .catch(() => { btnLikes.forEach(btn => { btn.disabled = false }) })
    })
  })
}
