import { $ } from 'rails-ujs'
import { removeClass } from '../common/util'

export const onOpenDropdown = () => {
  $('.js-dropdown').forEach(dropdown => {
    dropdown.querySelector('.js-dropdown-trigger').addEventListener('click', () => {
      dropdown.classList.toggle('is-active')
    })
  })
}

export const onCloseDropdown = () => {
  document.addEventListener(window.clickType, event => {
    $('.js-dropdown').forEach(dropdown => {
      if (dropdown.contains(event.target)) return

      removeClass(dropdown, 'is-active')
    })
  })
}
