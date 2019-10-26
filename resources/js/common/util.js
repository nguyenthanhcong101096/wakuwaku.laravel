import sanitizeHtml from 'sanitize-html'

export const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    } else {
      el = el.parentElement
    }
  }
  return null
}

export const removeElements = elements => elements.forEach(element => element.remove())

export const mathRound = decimal => {
  return Math.round(decimal * 10) / 10
}

export const sanitizeValue = data => {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {}
  })
}

export const preventJumpToTop = ({ keyCode }, insertType = null) => {
  if (keyCode !== 13) return

  const isChrome = window.navigator.userAgent.indexOf('Chrome') !== -1
  const isSafari = window.navigator.userAgent.indexOf('Safari') !== -1
  if (!isChrome || !isSafari) return

  const cursor = window.getSelection().focusNode
  const cursorEl = insertType === 'waku-post' ? cursor : cursor.parentElement

  cursorEl.scrollIntoView({ block: 'center', inline: 'center' })
}

export const getDateForm = (date, offsetTime) => {
  return new Date(date.getTime() + offsetTime)
}

export const removeClass = (selector, className) => {
  selector.classList.remove(className)
}

export const getSiblings = element => {
	// Setup siblings array and get the first sibling
	let siblings = []
	let sibling = element.parentNode.firstChild

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== element) {
			siblings.push(sibling)
		}
		sibling = sibling.nextSibling
  }

	return siblings
}

export const onHandleCountChange = ({ num = 1, el }) => {
  const countElement = document.querySelector(el)
  if (!countElement) return

  countElement.innerHTML = window.parseInt(countElement.textContent) + num
}
