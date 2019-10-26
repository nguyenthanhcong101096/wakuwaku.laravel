import { delegate } from 'rails-ujs'
import { closest } from '../common/util'

export const onClickBtnCloseToast = () => {
  const btnCloseToast = document.querySelector('.js-btn-close-toast')
  if (!btnCloseToast) return

  const resetTimeoutToast = setTimeout(() => { onCloseToast(btnCloseToast) }, 2000)

  btnCloseToast.addEventListener('click', () => {
    clearTimeout(resetTimeoutToast)
    onCloseToast(btnCloseToast)
  })
}

const onCloseToast = btnCloseToast => {
  btnCloseToast.parentElement.remove()
}

export const requireConfirmPost = () => {
  const btnConfirms = Array.prototype.slice.call(document.querySelectorAll('.js-btn-confirm-post'))
  if (!btnConfirms) return

  btnConfirms.forEach(btnConfirm => {
    btnConfirm.addEventListener('click', e => {
      if (!window.postCanEdit) return
      if (!confirm('Leave sites? Changes you made may not be saved.')) e.preventDefault()
    }, false)
  })
}

export const onClickDropdownList = () => {
  delegate(document, '.js-dropdown-trigger', 'click', event => {
    const dropdownMenu = closest(event.target, '.js-dropdown-trigger').querySelector('.js-dropdown-menu')
    dropdownMenu.classList.add('fade-in-up')

    onCloseDropdown(dropdownMenu)
  })
}

const onCloseDropdown = target => {
  document.addEventListener('click', e => {
    if (closest(target, '.js-dropdown-trigger').contains(e.target)) return
    target.classList.remove('fade-in-up')
  })

  delegate(document, '.js-translator-item', 'click', () => {
    target.classList.remove('fade-in-up')
  })
}

export const onChangeLanguage = () => {
  const switcher = document.querySelector('#js-language-switcher')

  if (!switcher) return
  switcher.addEventListener('change', event => { window.location = switcher.value })
}

export const onChangeCurrency = () => {
  const switcher = document.querySelector('.js-select-currency')

  if (!switcher) return
  switcher.addEventListener('change', event => { window.location = `${window.location.pathname}?currency=${switcher.value}` })
}

export const onDisplayTags = () => {
  const categoryTags = document.querySelector('.js-category-tags')
  if (!categoryTags) return

  document.querySelector('.js-modal-submit').addEventListener('click', function () {
    categoryTags.innerHTML = ''

    Array.prototype.slice.call(document.querySelector('.js-tag-item').querySelectorAll('input')).forEach(element => {
      if (element.checked === true) {
        let tagEl = `
          <li class="category-tag">${element.nextElementSibling.innerHTML}</li>
        `

        categoryTags.insertAdjacentHTML('beforeend', tagEl)
      }
    })
  })
}
