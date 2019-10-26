import axios from 'axios'
import { $ } from 'rails-ujs'

const updateBtnLoadMore = (btn, meta) => {
  if (meta.next_page) {
    btn.classList.remove('u-hidden')
    btn.setAttribute('data-load-more', JSON.stringify(meta))
  } else {
    btn.classList.add('u-hidden')
  }
}

export const onClickBtnLoadMore6S2I = () => {
  const containerLoadMore = document.querySelector('.js-container-load-more')
  if (!containerLoadMore) return

  $('.js-btn-load-more-6s2i').forEach(btn => {
    btn.addEventListener('click', event => {
      const data = JSON.parse(event.target.getAttribute('data-load-more'))
      const typePost = event.target.getAttribute('data-type-post')

      if (!data.next_page) return

      btn.disabled = true

      return axios.get('/load_more_posts', { params: { next_page: data.next_page, type: typePost } })
        .then(response => {
          containerLoadMore.insertAdjacentHTML('beforeend', response.data.html)
          updateBtnLoadMore(btn, response.data.meta)
          btn.disabled = false
          replaceAdPanels($('.js-panel-advertising'), response.data.advertising)
          window.myLazyLoad.update()
          return response
        })
        .catch(() => { btn.disabled = false })
    })
  })
}

const replaceAdPanels = (adPanels, adHTML) => {
  if (!adPanels.length) return
  
  return adPanels.forEach(adPanel => {
    adPanel.innerHTML = adHTML
  })
}
