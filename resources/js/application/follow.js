import axios from 'axios'
import { delegate } from 'rails-ujs'
import { closest, onHandleCountChange } from '../common/util'
import { isUserSignedIn } from './common'

export const onClickBtnFollow = () => {
  delegate(document, '.js-btn-follow', 'click', event => {
    if (!isUserSignedIn()) return

    const btn = closest(event.target, '.js-btn-follow')
    const btnParent = btn.parentNode
    const writerId = btn.getAttribute('data-writer-id')
    if (!writerId) return

    axios.post('/follows', { writer_id: writerId })
      .then(response => {
        const templateBtnUnfollow = `
          <button name="button" type="button" class="btn btn--default btn-follow is-following js-btn-unfollow" data-writer-id="${writerId}">${window.__INIT_DATA__.I18n.unfollow}</button>
        `
        btnParent.removeChild(btn)
        btnParent.insertAdjacentHTML('beforeend', templateBtnUnfollow)
        onHandleCountChange({ el: '.js-followers-count' })

        return response
      })
      .catch(error => { throw error })
  })
}

export const onClickBtnUnfollow = () => {
  delegate(document, '.js-btn-unfollow', 'click', event => {
    if (!isUserSignedIn()) return

    const btn = closest(event.target, '.js-btn-unfollow')
    const btnParent = btn.parentNode
    const writerId = btn.getAttribute('data-writer-id')
    if (!writerId) return

    axios.delete(`/follows/${writerId}`)
      .then(response => {
        const templateBtnFollow = `
          <button name="button" type="button" class="btn btn--red btn-follow js-btn-follow" data-writer-id="${writerId}">${window.__INIT_DATA__.I18n.follow}</button>
        `
        btnParent.removeChild(btn)
        btnParent.insertAdjacentHTML('beforeend', templateBtnFollow)
        onHandleCountChange({ num: -1, el: '.js-followers-count' })

        return response
      })
      .catch(() => { btn.disabled = false })
  })
}
