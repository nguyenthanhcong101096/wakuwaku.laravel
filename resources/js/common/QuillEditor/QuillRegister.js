import Quill from 'quill'
import Delta from 'quill-delta'
// import formats

import BlotBlockDivider from './BlotBlockDivider'
import BlotEmbedImage from './BlotEmbedImage'
import BlotBlockEmbedTweet from './BlotBlockEmbedTweet'
import EmbedBlotBlockVideo from './EmbedBlotBlockVideo'
import BlotBlockEmbedInstagram from './BlotBlockEmbedInstagram'
import BlotBlockEmbedWakuPost from './BlotBlockEmbedWakuPost'
import BlotBlockEmbedMaps from './BlotBlockEmbedMaps'

const Block = Quill.import('blots/block')
const BlockEmbed = Quill.import('blots/block/embed')
const Inline = Quill.import('blots/inline')
const Clipboard = Quill.import('modules/clipboard')

Quill.register(BlotBlockDivider(BlockEmbed))
Quill.register(BlotBlockEmbedTweet(BlockEmbed))
Quill.register(BlotBlockEmbedInstagram(BlockEmbed))
Quill.register(EmbedBlotBlockVideo(BlockEmbed))
Quill.register(BlotBlockEmbedWakuPost(BlockEmbed))
Quill.register(BlotBlockEmbedMaps(BlockEmbed))
Quill.register(BlotEmbedImage(BlockEmbed))

class PlainTextClipboard extends Clipboard {
  onPaste (e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return
    let range = this.quill.getSelection()
    let delta = new Delta().retain(range.index)

    if (e && e.clipboardData && e.clipboardData.types && e.clipboardData.getData) {
      let text = (e.originalEvent || e).clipboardData.getData('text/plain')
      let cleanedText = this.convert(text)

      // Stop the data from actually being pasted
      e.stopPropagation()
      e.preventDefault()

      // Process cleaned text
      delta = delta.concat(cleanedText).delete(range.length)
      this.quill.updateContents(delta, Quill.sources.USER)
      // range.length contributes to delta.length()
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)

      return false
    }
  }
}

Quill.register('modules/clipboard', PlainTextClipboard, true)

export default Quill

export {
  Block,
  BlockEmbed,
  Inline
}
