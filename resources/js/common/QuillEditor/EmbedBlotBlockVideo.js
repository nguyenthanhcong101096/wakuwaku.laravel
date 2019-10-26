export default function EmbedBlotBlockVideo (BlockEmbed) {
  class EmbedBlotBlockVideo extends BlockEmbed {
    static blotName = 'wk-youtube'
    static tagName = 'div'
    static className = 'youtube'
    static create (url) {
      let node = super.create()
      node.setAttribute('src', url)
      node.setAttribute('class', 'embed-video-container')
      node.setAttribute('contenteditable', false)

      let ytIframe = `
        <iframe title='Post Video' frameborder='0' allowfullscreen='true' src=${url}>
        </iframe>
      `
      node.innerHTML = ytIframe
      return node
    }
    static value (node) {
      return node.getAttribute('src')
    }
  }
  return EmbedBlotBlockVideo
}
