import Croppie from 'croppie'

export default class Cropper {
  constructor (options) {
    this.inputFileAvatar = document.querySelector('.js-input-avatar')
    this.config = Cropper.mergeSettings(options)
    this.avatar = document.querySelector('.js-avatar-preview')
    this.cropperBtn = document.querySelector('.js-btn-cropper')
    this.modal = document.querySelector('#js-modal-cropper')
    this.cropperImage = document.querySelector('.js-cropper-image')
    this.responseCropper = document.querySelector('.js-response-cropper')
  }

  static mergeSettings (options) {
    const isScreenXs = (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) < 576

    return Object.assign({
      viewport: {
        width: isScreenXs ? 180 : 320,
        height: isScreenXs ? 180 : 320,
        type: 'circle'
      },
      boundary: {
        width: 100 + `%`,
        height: isScreenXs ? 300 : 352
      },
      size: { width: 200, height: 200 }
    }, options)
  }

  _initCroppie () {
    let that = this
    this.croppie = new Croppie(this.cropperImage, {
      enforceBoundary: true,
      showZoomer: true,
      enableExif: true,
      viewport: that.config.viewport,
      boundary: that.config.boundary
    })

    this.fileReader()
    this.cropImage()
  }

  // Upload image and open modal
  fileReader () {
    this.inputFileAvatar.addEventListener('change', () => {
      if (this.inputFileAvatar.files && this.inputFileAvatar.files[0]) {
        let reader = new FileReader()

        reader.onload = event => {
          this.croppie.bind({
            url: event.target.result
          })

          this.modal.classList.add('active')
        }

        reader.readAsDataURL(this.inputFileAvatar.files[0])
      }
    })
  }

  // Crop image && set base64 to input hidden && close modal
  cropImage () {
    let that = this

    this.cropperBtn.addEventListener('click', () => {
      this.croppie.result({
        type: 'base64',
        format: 'png',
        quality: 1,
        size: that.config.size
      }).then(function (response) {
        that.avatar.src = response
        that.responseCropper.value = response
        return response
      }).catch(err => { throw err })

      that.modal.classList.remove('active')
    })
  }
}
