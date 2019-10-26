import flatpickr from './flatpickr'

export const onClickBtnOpenFilter = () => {
  const btnOpenFilter = document.querySelector('.js-btn-open-filter')
  if (!btnOpenFilter) return

  btnOpenFilter.addEventListener('click', event => {
    event.stopPropagation()
    document.querySelector('.js-filter').classList.add('opened')
  })
}

export const onClickBtnCloseFilter = () => {
  const filter = document.querySelector('.js-filter')
  if (!filter) return

  document.querySelector('.js-btn-close-filter').addEventListener('click', event => {
    event.preventDefault()
    onCloseFilter(filter)
  })

  document.addEventListener('click', event => {
    if (filter.contains(event.target)) return
    onCloseFilter(filter)
  })
}

const onCloseFilter = filter => {
  filter.classList.remove('opened')
}

export const onClickResetFilter = () => {
  const filter = document.querySelector('.js-filter')
  const btnResetFilter = document.querySelector('.js-reset-filter')
  if (!filter || !btnResetFilter) return

  const filterInputs = Array.prototype.slice.call(filter.querySelectorAll('input'))

  btnResetFilter.addEventListener('click', event => {
    event.preventDefault()
    filterInputs.forEach(input => {
      if (input.type === 'checkbox') input.checked = false
      if (input.type === 'text' && !input._flatpickr) input.value = null
      if (input._flatpickr) input._flatpickr.clear()
    })
  })
}

export const initEditorPostFilter = () => {
  const editorPostFilter = document.querySelector('#editor-post-filter')
  if (!editorPostFilter) return

  const filterCreatedPostEndPicker = flatpickr('input[name=created_post_end]', {
    appendTo: editorPostFilter,
    dateFormat: 'd M. Y',
    onPreCalendarPosition () {
      // Hack Trick !!! override flatpickr calendar position in editor's post filter
      this.calendarContainer.classList.add('u-right-16')
    }
  })

  const filterCreatedPostStartPicker = flatpickr('input[name=created_post_start]', {
    appendTo: editorPostFilter,
    dateFormat: 'd M. Y',
    onPreCalendarPosition () {
      // Hack Trick !!! override flatpickr calendar position in editor's post filter
      this.calendarContainer.classList.add('u-left-16')
    },
    onChange () {
      filterCreatedPostEndPicker.config.minDate = this.selectedDates[0]
    },
    onOpen () {
      this.config.maxDate = filterCreatedPostEndPicker.selectedDates[0]
    }
  })

  filterCreatedPostEndPicker.config.onOpen.push(() => {
    filterCreatedPostEndPicker.config.minDate = filterCreatedPostStartPicker.selectedDates[0]
  })

  filterCreatedPostEndPicker.config.onChange.push(() => {
    const postEndDate = filterCreatedPostEndPicker.selectedDates[0]
    if (postEndDate) filterCreatedPostStartPicker.config.maxDate = postEndDate
  })
}
