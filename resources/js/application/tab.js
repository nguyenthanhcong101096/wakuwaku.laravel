import { removeClass } from '../common/util'

export const onChangeTab = () => {
  let tabInputs = null
  let currentValue = null

  const radioInputs = Array.prototype.slice.call(document.querySelectorAll('input[name=radio-tab]'))
  const localeSelectors = Array.prototype.slice.call(document.querySelectorAll('.js-locale-tab-selector'))

  if (radioInputs.length) {
    tabInputs = radioInputs
    currentValue = document.querySelector('input[name=radio-tab]:checked').value
  } else {
    tabInputs = localeSelectors
    currentValue = window.location.search.split('?locale=').join('') || 'en'
  }

  if (!tabInputs.length) return

  displayContent(currentValue)

  tabInputs.forEach(tab => {
    tab.addEventListener('change', event => {
      displayContent(event.target.value)

      window.myLazyLoad.update()
    })
  })
}

const displayContent = contentTarget => {
  const tabContents = Array.prototype.slice.call(document.querySelectorAll('.js-tab-content'))
  if (!tabContents.length) return

  tabContents.forEach(content => {
    content.getAttribute('id') === contentTarget ? removeClass(content, 'u-hidden') : content.classList.add('u-hidden')

    const localeSelector = content.querySelector('.js-locale-tab-selector')
    if (localeSelector) localeSelector.value = content.getAttribute('id')
  })
}
