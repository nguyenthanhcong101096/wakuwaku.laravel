import axios from 'axios'
import Quill, { Block } from './QuillRegister'
import { mathRound, preventJumpToTop } from '../util'

export default class QuillEditor {
  USER = Quill.sources.USER;
  SILENT = Quill.sources.SILENT;
  SELECTION_CHANGE = Quill.events.SELECTION_CHANGE;

  constructor (container, skipEdit = false) {
    this.blockRenderDelta = {
      imageUploading: 0,
      imageUploaded: 0
    }
    if (skipEdit) {
      this.quill = new Quill(container)
    } else {
      this.quill = new Quill(container, {
        theme: 'bubble'
      })
    }
  }

  allImageUploaded () {
    return this.blockRenderDelta.imageUploading === this.blockRenderDelta.imageUploaded
  }

  imageUploading (count) {
    this.blockRenderDelta.imageUploading += count
  }

  imageUploaded (count) {
    this.blockRenderDelta.imageUploaded += count
  }

  removeFormat (index, lenght) {
    this.quill.removeFormat(index, lenght, Quill.sources.USER)
  }

  addContainer (container) {
    this.quill.addContainer(container)
  }

  onEditorChange (onChange) {
    this.quill.on(Quill.events.EDITOR_CHANGE, onChange)
  }

  getDescendantOfBlock (index) {
    return this.quill.scroll.descendant(Block, index)
  }
  getBounds (range) {
    return this.quill.getBounds(range)
  }
  getSelectionRange () {
    return this.quill.getSelection(true)
  }

  setFormatDivider () {
    let range = this.quill.getSelection(true)
    this.quill.insertEmbed(range.index, 'wk-divider', true, Quill.sources.USER)
    this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
  }

  setEmbedYoutube (url) {
    const ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/ /* eslint-disable-line */
    const ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/
    const ytMatch = url.match(ytRegExp)
    if (ytMatch && ytMatch[1].length === 11) {
      const youtubeId = ytMatch[1]
      var start = 0
      if (typeof ytMatch[2] !== 'undefined') {
        const ytMatchForStart = ytMatch[2].match(ytRegExpForStart)
        if (ytMatchForStart) {
          for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
            start += (typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0)
          }
        }
      }
      const link = 'https://www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : '')
      let range = this.quill.getSelection(true)
      this.quill.insertEmbed(range.index, 'wk-youtube', link, Quill.sources.USER)
      this.quill.setSelection(range.index + 1, this.SILENT)
    } else {
      window.alert('incorrent link')
    }
  }
  setEmbedTwitter (url) {
    const twRegExp = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/
    const twMatch = url.match(twRegExp)
    if (twMatch && twMatch[2].length) {
      let range = this.quill.getSelection(true)
      this.quill.insertEmbed(range.index, 'wk-tweet', twMatch[2], this.USER)
      this.quill.setSelection(range.index + 1, this.SILENT)
    } else {
      window.alert('incorrent link')
    }
  }

  setEmbedWakuPost (url, event) {
    axios.get(url)
      .then(res => {
        let range = this.quill.getSelection(true)
        this.quill.insertEmbed(range.index, 'waku-post', url, this.USER)
        this.quill.setSelection(range.index + 1, this.SILENT)
        preventJumpToTop(event, 'waku-post')
        return res
      })
      .catch(err => {
        if (!err.response || err.response.status !== 404) throw err
        alert('Incorrect link!')
      })
  }

  setEmbedInstagram (url) {
    const igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/
    const igMatch = url.match(igRegExp)
    if (igMatch && igMatch[0].length) {
      let range = this.quill.getSelection(true)
      this.quill.insertEmbed(range.index, 'wk-instagram', 'https://instagram.com/p/' + igMatch[1] + '/embed/', this.USER)
      this.quill.setSelection(range.index + 1, this.SILENT)
    } else {
      window.alert('incorrent link')
    }
  }

  setEmbedImage (file, range) {
    var reader = new FileReader()
    reader.onload = (e) => {
      // check if img size bigger than 5MB
      if (getImageSize(e.target.result) > 5) {
        alert('Picture larger than 5MB cannot be uploaded!')
        return
      }
      this.quill.insertEmbed(range.index, 'wk-image', {
        alt: 'Quill Cloud',
        url: e.target.result
      }, this.USER)
    }
    reader.readAsDataURL(file)
  }

  setEmbedMaps (iframe) {
    if (!/<iframe\s*src="https:\/\/www\.google\.com\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>/.test(iframe)) {
      alert('Invalid Google Maps iframe!')
      return
    }
    const url = iframe.match(/src=[\"'](.+?)[\"']/)[1]
    let range = this.quill.getSelection(true)

    this.quill.insertEmbed(range.index, 'wk-maps', url, this.USER)
  }

  formatImageEmbed (url, imgPostId, range) {
    this.quill.formatLine(range.index, 0, 'src', url, this.SILENT)
    this.quill.formatLine(range.index, 1, 'imgPostId', imgPostId, this.SILENT)
    this.quill.setSelection(range.index + 1, this.SILENT)
  }
}

function getImageSize (base64Src) {
  if (base64Src) return mathRound(((base64Src.length * (3 / 4)) - 1) / 1000000)
}
