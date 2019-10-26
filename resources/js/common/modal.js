export const onOpenModal = () => {
  const btnsOpenModal = Array.prototype.slice.call(document.querySelectorAll('.js-btn-open-modal'))
  if (!btnsOpenModal) return

  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      let modalTarget = document.querySelector(`#${btn.getAttribute('data-modal-target')}`)
      if (!modalTarget) return

      modalTarget.classList.add('active')
    })
  })
}

export const onCloseModal = () => {
  const modals = Array.prototype.slice.call(document.querySelectorAll('.js-modal'))
  if (!modals) return

  modals.forEach(modal => {
    let btnClose = modal.querySelectorAll('.js-btn-close-modal')
    if (!btnClose) return

    Array.prototype.slice.call(btnClose).forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()

        modal.classList.remove('active')
      })
    })
  })
}
