export const onChangeLocale = () => {
  const selector = document.querySelector('.js-locale-selector select')
  if (!selector) return

  selector.addEventListener('change', () => {
    window.location.href = `${window.location.origin}${selector.value}`
  })
}

export const isUserSignedIn = () => {
  return window.__INIT_DATA__.currentUser ? true : (() => { window.location.href = `${window.location.origin}/signin` })()
}
