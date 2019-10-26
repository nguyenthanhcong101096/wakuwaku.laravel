export default function BlotBlockEmbedMaps (BlockEmbed) {
  class BlotBlockEmbedMaps extends BlockEmbed {
    static blotName = 'wk-maps'
    static tagName = 'div'
    static className = 'maps'
    static create (url) {
      let node = super.create()
      node.setAttribute('id', url)
      node.setAttribute('class', 'embed-maps-container')
      node.setAttribute('contenteditable', false)

      node.innerHTML = `<iframe frameborder='0' allowfullscreen='true' src=${url}></iframe>`
      return node
    }
    static value (domNode) {
      return domNode.getAttribute('id')
    }
  }
  return BlotBlockEmbedMaps
}
