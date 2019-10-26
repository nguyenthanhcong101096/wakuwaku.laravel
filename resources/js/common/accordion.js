import { $ } from 'rails-ujs'
import { closest } from '../common/util'

export const onClickBtnToggleAccordion = () => {
  $('.js-btn-toggle-accordion').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      closest(event.target, '.js-accordion').classList.toggle('active')
    })
  })
}
