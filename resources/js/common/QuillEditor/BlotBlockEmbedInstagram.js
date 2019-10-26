export default function BlotBlockEmbedInstagram (BlockEmbed) {
  class BlotBlockEmbedInstagram extends BlockEmbed {
    static blotName = 'wk-instagram';
    static tagName = 'div';
    static create (url) {
      const node = super.create()
      node.setAttribute('src', url)
      node.setAttribute('class', 'embed-instagram-container')
      node.setAttribute('contenteditable', false)

      let instagramIframe = `
        <iframe title='Post Instagram' frameborder='0' allowtransparency='true' scrolling='no' src=${url}>
        </iframe>
      `
      node.innerHTML = instagramIframe
      return node
    }

    static value (node) {
      return node.getAttribute('src')
    }
  }
  return BlotBlockEmbedInstagram
}
