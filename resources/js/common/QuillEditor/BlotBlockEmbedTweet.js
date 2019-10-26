export default function BlotBlockEmbedTweet (BlockEmbed) {
  class BlotBlockEmbedTweet extends BlockEmbed {
    static blotName = 'wk-tweet';
    static tagName = 'div';
    static className = 'embed-tweet-container';
    static create (id) {
      let node = super.create()
      node.setAttribute('id', id)
      node.setAttribute('contenteditable', false)
      node.setAttribute('title', 'Post Instagram')

      window.twttr.widgets.createTweet(id, node).then(element => {
        const editorEmbedControl = document.querySelector('#editor-embed-control')
        const paragraph = document.querySelector('.ql-editor p')
        if (!editorEmbedControl || !paragraph) return

        editorEmbedControl.style.top = `${node.offsetHeight + node.offsetTop + paragraph.offsetHeight * 3}px`
        element.style.width = '100%'

        return element
      }).catch(e => { throw e })
      return node
    }
    static value (domNode) {
      return domNode.getAttribute('id')
    }
  }
  return BlotBlockEmbedTweet
}
