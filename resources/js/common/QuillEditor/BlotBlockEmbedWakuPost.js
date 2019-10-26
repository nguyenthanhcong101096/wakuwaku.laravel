import axios from 'axios'

function createPost (url, node) {
  const rootContainer = document.createElement('a')
  rootContainer.setAttribute('class', 'post-card')

  const imgContainer = document.createElement('div')
  imgContainer.setAttribute('class', 'post-card-img')
  const img = document.createElement('img')
  imgContainer.appendChild(img)
  rootContainer.appendChild(imgContainer)

  const title = document.createElement('h3')
  title.setAttribute('class', 'post-card-title')
  rootContainer.appendChild(title)

  axios.get(url).then(res => {
    displayWakuPost(res.data)
    rootContainer.setAttribute('target', '_blank')
    return res.data
  }).catch(err => {
    if (!err.response || err.response.status !== 404) throw err
    displayWakuPost()
  })

  node.appendChild(rootContainer)

  function displayWakuPost (data = { url: '#', post_image_url: '/waku-post-default.png', title: 'This article has been removed.' }) {
    rootContainer.setAttribute('href', data.url)
    img.setAttribute('src', data.post_image_url)
    title.innerHTML = data.title
  }
}

export default function BlotBlockEmbedWakuPost (BlockEmbed) {
  class BlotBlockEmbedWakuPost extends BlockEmbed {
    static blotName = 'waku-post';
    static tagName = 'div';
    static className = 'embed-waku-container';
    static create (id) {
      let node = super.create()
      node.setAttribute('id', id)
      node.setAttribute('contenteditable', false)
      createPost(id, node)
      return node
    }
    static value (domNode) {
      return domNode.getAttribute('id')
    }
  }
  return BlotBlockEmbedWakuPost
}
