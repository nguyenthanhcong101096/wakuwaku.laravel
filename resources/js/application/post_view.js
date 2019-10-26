import axios from 'axios'

export const onScrollPostPage = () => {
  const post = document.querySelector('.js-post')
  if (!post) return

  const page = document.querySelector('#js-main')
  if (page && page.getAttribute('data-page') === 'preview') return

  // How long user need to read. This length is half of post
  const contentLength = post.offsetTop + post.clientHeight

  let triggered = false

  const countViewHandler = () => {
    if (triggered || window.scrollY < contentLength) return

    triggered = true
    axios.post('/post_views', { post_id: post.getAttribute('data-post-id') })
      .then(response => {
        window.removeEventListener('scroll', countViewHandler)
        return response
      })
      .catch(error => { throw error })
  }

  window.addEventListener('scroll', countViewHandler)
}
