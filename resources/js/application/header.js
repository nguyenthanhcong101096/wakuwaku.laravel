import { removeClass } from '../common/util'

export const onToggleHeader = () => {
  const btnCollapse = document.querySelector('.js-navbar-collapse')
  const navBar = document.querySelector('.js-navbar')
  if(!btnCollapse || !navBar) return

  const navBarExpanded = navBar.querySelector('.js-navbar-expanded')

  btnCollapse.addEventListener('click', () => {
    navBar.classList.toggle('is-active')
  })

  document.addEventListener(window.clickType, event => {
    if (btnCollapse.contains(event.target) || navBarExpanded.contains(event.target)) return
    removeClass(navBar, 'is-active')
  })
}

export const onScrollHeader = () => {
  const header = document.querySelector('.js-header')
  const navBar = document.querySelector('.js-navbar')
  if(!header || !navBar) return

  handleOnScroll()

  window.addEventListener('resize', () => {
    handleOnScroll()
  })

  const init = {
    windowLastPos: 0,
    isScrolling: null,
    bottom: document.body.clientHeight - window.innerHeight,
    windowCurPos: window.pageYOffset || document.documentElement.scrollTop
  }

  function handleOnScroll() {
    if (window.innerWidth > 767) {
      removeClass(header, 'is-scroll-up')
      removeClass(document.querySelector('.js-navbar'), 'is-active')
      removeClass(header.querySelector('.js-dropdown'), 'is-active')
    } else {
      window.addEventListener('scroll', () => {
        if (window.innerWidth > 767) return

        window.clearTimeout(init.isScrolling)
        init.windowCurPos = window.pageYOffset || document.documentElement.scrollTop

        // If windown current position bigger than window last position add event class esle remove
        init.windowCurPos > init.windowLastPos ? header.classList.add('is-scroll-up') : removeClass(header, 'is-scroll-up')

        if (init.windowCurPos <= 0 || (init.windowCurPos + header.offsetHeight) >= init.bottom) removeClass(header, 'is-scroll-up')

        if(navBar.classList.contains('is-active')) removeClass(navBar, 'is-active')
        if(header.querySelector('.js-dropdown').classList.contains('is-active')) removeClass(header.querySelector('.js-dropdown'), 'is-active')

        init.isScrolling = setTimeout(function() {
          init.windowLastPos = init.windowCurPos
        }, 50)
      })
    }
  }
}
