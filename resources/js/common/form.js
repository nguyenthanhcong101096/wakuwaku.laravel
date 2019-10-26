import { closest } from './util'

export const onHandleFormOther = () => {
  const formOther = document.querySelector('.js-form-other')
  if (!formOther) return

  const inputValueOthers =  Array.prototype.slice.call(formOther.querySelectorAll('input[value=other], input[type=radio], .js-form-select'))

  inputValueOthers.forEach(inputValueOther => {
    inputValueOther.addEventListener('change', event => {
      const inputTextOther = closest(event.target, '.js-form-group').querySelector('.js-input-text-other')
      const compareInputType = (inputValueOther.checked && inputValueOther.value === 'other') || (inputValueOther.type === 'select-one' && inputValueOther.options[inputValueOther.selectedIndex].value === 'other')

      if (compareInputType) {
        inputTextOther.classList.remove('u-hidden')
      } else {
        inputTextOther.classList.add('u-hidden')
        inputTextOther.value = ''
      }
    })
  })
}
