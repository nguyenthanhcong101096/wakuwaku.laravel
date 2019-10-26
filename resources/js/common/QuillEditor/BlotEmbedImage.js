
const ATTRIBUTES = ['alt', 'height', 'width', 'src']

function sanitize (url, protocols) {
  const anchor = document.createElement('a')
  anchor.href = url
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'))
  return protocols.indexOf(protocol) > -1
}

export default function BlotEmbedImage (BlockEmbed) {
  class BlotEmbedImage extends BlockEmbed {
    static blotName = 'wk-image';
    static tagName = 'IMG';
    static create (value) {
      const node = super.create(value)
      node.setAttribute('class', 'post-content-image')
      node.setAttribute('src', this.sanitize(value.url))
      node.setAttribute('alt', 'post content image')
      return node
    }
    static match (url) {
      return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
    }

    static register () {
      if (/Firefox/i.test(navigator.userAgent)) {
        setTimeout(() => {
          // Disable image resizing in Firefox
          document.execCommand('enableObjectResizing', false, false)
        }, 1)
      }
    }

    static sanitize (url) {
      return sanitize(url, ['http', 'https', 'data']) ? url : '//:0'
    }

    static value (domNode) {
      return domNode.getAttribute('src')
    }

    static formats (node) {
      let formats = ATTRIBUTES.reduce((formats, attribute) => {
        if (node.hasAttribute(attribute)) {
          formats[attribute] = node.getAttribute(attribute)
        }
        return formats
      }, {})
      if (node.getAttribute('imgPostId')) {
        formats.imgPostId = node.getAttribute('imgPostId')
      }
      return formats
    }

    format (name, value) {
      if (name === 'imgPostId') {
        this.domNode.setAttribute('imgPostId', value)
      }
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value)
        } else {
          this.domNode.removeAttribute(name)
        }
      } else {
        super.format(name, value)
      }
    }
  }
  return BlotEmbedImage
}
