<template>
  <div class="upload">
    <slot></slot>
    <div class="image" :style="{'background-image':'url('+server+file+')'}" v-if="file!=''&&preview"></div>
    <div class="progress" v-if="percent>0" style="display: none">
      <span :style="{width:percent+'%'}"></span>
      <em class="pa">{{percent}}%</em>
    </div>
    <input type="file" class="upload inupt" @change="fileChange" :accept="accepts" :multiple="multiple" >
    <div class="crop" v-if="showCrop" transition="crop"  :style="{height:cropHeight+'px'}">
      <div class="loading" v-if="!showCropDialog">
        <div class="v-beat v-beat-odd"></div>
        <div class="v-beat v-beat-even"></div>
        <div class="v-beat v-beat-odd"></div>
      </div>
      <div class="dialog" :style="{width:width+'px',top:cropTop+'px'}" v-if="showCropDialog">
        <section :style="{width:width+'px',height:height+'px'}" :class="{'grab':grabbing==false,'grabbing':grabbing}">
        <img 
          :style="{width:scaleWidth+'px',height:scaleHeight+'px',left:scaleX+'px',top:scaleY+'px'}"
          @mousedown.prevent="cropDragBegin"
          @mousemove.prevent="cropDragMove"  
          @mouseup.prevent="cropDragEnd"
          @touchstart.prevent="cropDragBegin"
          @touchmove.prevent="cropDragMove"  
          @touchend.prevent="cropDragEnd"
          :src="cropImage">
        </section>
        <footer>
          <button @click="cropCancel">{{cancel}}</button>
          <button @click="cropOK">{{ok}}</button>
        </footer>
        <input type="range" v-model="scale" min="100" max="200" step="1" @input="cropZoom">
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
  .upload
    position relative
    width 100%
    height 100%
    cursor pointer
    border-radius inherit
    .image
      transition all .3s ease-in-out
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      background-size cover
      background-position center
      background-repeat no-repeat
      border-radius inherit
    & > input
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      opacity 0
      cursor pointer
    .progress
      position absolute
      left 0
      bottom 0
      right 0
      top 0
      width 100%
      box-sizing border-box
      background-color rgba(0, 0, 0,.8)
      span
        box-sizing border-box
        display block
        height 100%
        width 0%
        border-bottom 5px solid rgba(164, 208, 99,.8)
      em
        left 50%
        top 50%
        transform translate(-50%,-50%)
        font-size .8rem
        line-height 100%
        color #fff
    .crop
      position fixed
      z-index 9998
      width 100%
      height 100%
      left 0
      top 0
      background-color rgba(0,0,0,.7)
      transition opacity .5s ease
      -webkit-backdrop-filter blur(5px)
      .dialog
        position fixed
        left 50%
        transform translate(-50%,0%)
        background-color #FAFAFC
        border-radius 3px
        transition all .5s ease
        section
          display block
          position relative
          overflow hidden
          -webkit-user-select none
          user-select none
          border-radius 3px 3px 0 0
          img
            position absolute
        .grab
          cursor grab
        .grabbing
          cursor grabbing
        input
          position absolute
          bottom 70px
          left 50%
          transform translateX(-50%)
        footer
          display block
          border-top 1px solid #E8E8EA
          button
            float left
            width 50%
            height 100%
            padding 1rem 0
            font-weight 600
            text-align center
            color #5F7B88
            cursor  pointer
            font-size 14px
            background-color transparent
            border 0
            &:nth-child(1)
              border-right 1px solid #E8E8EA
      .loading
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        .v-beat
          animation v-beatStretchDelay 0.7s infinite linear
          animation-fill-mode both
          display inline-block
          width 10px
          height 10px
          background-color #fff
          border-radius 50%
        .v-beat-odd
          animation-delay 0s
        .v-beat-even
          animation-delay 0.35s
  @-webkit-keyframes v-beatStretchDelay
    50%
      -webkit-transform: scale(0.75)
      opacity: 0.2
    100%
      -webkit-transform: scale(1)
      opacity: 1
  @keyframes v-beatStretchDelay
    50%
      transform: scale(0.75)
      opacity: 0.2
    100%
      transform: scale(1)
      opacity: 1
  input[type=range]
    -webkit-appearance none
    &:focus
      outline none
      &::-ms-fill-lower
        background rgba(0, 0, 0, 0.5)
      &::-ms-fill-upper
        background rgba(0, 0, 0, 0.5)
    &::-webkit-slider-runnable-track
      width 100%
      height 2px
      cursor pointer
      background #efb708
    &::-webkit-slider-thumb
      height 20px
      width 20px
      border-radius 10px
      background #ffffff
      border 2px solid #efb708
      cursor pointer
      -webkit-appearance none
      margin-top -10px
    &::-moz-range-track
      width 100%
      height 2px
      cursor pointer
      background #efb708
    &::-moz-range-thumb
      height 16px
      width 16px
      border-radius 8px
      border 2px solid #efb708
      background #ffffff
      cursor pointer
    &::-ms-track
      width 100%
      height 1px
      cursor pointer
      background transparent
      border-color transparent
      color transparent
    &::-ms-fill-lower
      background rgba(0, 0, 0, 0.5)
      border 0px solid rgba(200, 200, 200, 0.2)
      border-radius 0px
      box-shadow 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0)
    &::-ms-fill-upper
      background rgba(0, 0, 0, 0.5)
      border 0px solid rgba(200, 200, 200, 0.2)
      border-radius 0px
      box-shadow 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0)
    &::-ms-thumb
      height 16px
      width 16px
      border-radius 8px
      background #ffffff
      cursor pointer
      height 1px
  ::-webkit-file-upload-button
    cursor: pointer
</style>

<script>
export default {
  props: {
    // Server host,like "http://jinzhe.net"
    server: {
      type: String,
      require: true
    },
    // Server api path,like "/api/v1/getdata/"
    api: {
      type: String,
      require: true
    },
    // POST Params
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // Upload input filename,used for server side get the file stream.
    filename: {
      type: String,
      default: 'file'
    },
    // Used for binding parent component data and show image preview.
    file: {
      type: String,
      default: '',
      twoWay: true
    },
    // Allow Upload extension
    ext: {
      type: String,
      default: 'jpg,gif,png'
    },
    // Used for send to server side
    header: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // File upload limit
    limit: {
      type: Number,
      default: 1024 * 1024 * 64
    },
    multiple: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    auto: {
      type: Boolean,
      default: true
    },
    // Crop on or off
    crop: {
      type: Boolean,
      default: false
    },
    // Crop image width
    width: {
      type: Number,
      default: 200
    },
    // Crop image height
    height: {
      type: Number,
      default: 200
    },
    // Crop image "OK" button text
    ok: {
      type: String,
      default: 'OK'
    },
    // Crop image "cancel" button text
    cancel: {
      type: String,
      default: 'Cancel'
    },
    // Crop image quality
    quality: {
      type: Number,
      default: 0.8
    },
    // Used for crop display position,default is document.body
    container: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isMobile: /(iphone|ios|android|iPad)/i.test(navigator.userAgent),
      percent: 0,
      files: [],
      accepts: '',
      mimes: {
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'mp4': 'video/mp4',
        'mov': 'video/quicktime',
        'wmv': 'video/x-ms-wmv',
        'flv': 'video/x-flv',
        'svg': 'image/svg+xml',
        'psd': 'image/photoshop',
        'mp3': 'audio/mpeg',
        'rar': 'application/x-rar-compressed',
        'zip': 'application/zip',
        'json': 'application/json',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'doc': 'application/msword',
        'pdf': 'application/pdf',
        'xls': 'application/vnd.ms-excel',
        'ppt': 'application/vnd.ms-powerpoint'
      },
      scrollbar: null,
      input: null,
      cropHeight: 0,
      cropTop: 0,
      showCrop: false,
      showCropDialog: false,
      // 缩放
      scale: 100,
      scaleX: 0,
      scaleY: 0,
      scaleLength: 0,
      scaleWidth: 0,
      scaleHeight: 0,
      drag: false,
      grabbing: false,
      beginX: 0,
      beginY: 0,
      beginLength: 0,
      img: null,
      canvas: null,
      context: null
    }
  },
  watch: {
    percent () {
      if (this.percent === 100) {
        setTimeout(() => {
          this.percent = 0
        }, 500)
      }
    },
    auto () {
      if (this.auto) {
        this.uploadFiles()
        this.auto = false
      }
    }
  },
  ready () {
    if (this.crop) {
      this.multiple = false
      this.ext = 'jpg'
      this.auto = false
    }
    let accepts = []
    let exts = this.ext.split(',')
    for (let i = 0; i < exts.length; i++) {
      accepts.push(this.mimes[exts[i]])
    }
    this.accepts = accepts.join(',')
  },
  methods: {
    fileChange (e) {
      this.input = e.target
      if (this.crop) {
        if (e.target.files.length === 0) return false
        this.showCrop = true
        this.showCropDialog = false
        // 读取本地图片转成base64显示到页面待使用
        let fr = new window.FileReader()
        fr.onload = e => {
          this.img = new window.Image()
          this.img.src = fr.result
          this.img.onload = () => {
            if (this.container === '') {
              if (window.getComputedStyle(document.body).overflow === 'hidden') {
                this.scrollbar = document.querySelector('.router')
              } else {
                this.scrollbar = document.body
              }
            } else {
              this.scrollbar = document.querySelector(this.container)
            }
            let scrollHeight = this.scrollbar.scrollHeight
            // let scrollTop=this.scrollbar.scrollTop
            let windowHeight = window.innerHeight
            // console.log(windowHeight,scrollHeight)
            if (scrollHeight <= windowHeight) {
              this.cropHeight = windowHeight
              this.cropTop = ~~(windowHeight - (this.height + 50)) / 2
            } else {
              this.cropHeight = scrollHeight
              this.cropTop = ~~((windowHeight - (this.height + 50)) / 2)
            }
            // 按原始图片比例优先使用小值设置最低值
            if (this.img.naturalWidth > this.img.naturalHeight) {
              this.scaleHeight = this.height
              this.scaleWidth = Math.round(this.scaleHeight * this.img.naturalWidth / this.img.naturalHeight)
            } else {
              this.scaleWidth = this.width
              this.scaleHeight = Math.round(this.scaleWidth * this.img.naturalHeight / this.img.naturalWidth)
            }
            this.scaleX = -Math.round((this.scaleWidth - this.width) / 2)
            this.scaleY = -Math.round((this.scaleHeight - this.height) / 2)
            this.cropImage = fr.result
            // 渲染到canvas
            this.canvas = document.createElement('canvas')
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.canvas.setAttribute('style', 'position:absolute;left:-10000px;top:0;opacity:0;z-index:99999')
            this.context = this.canvas.getContext('2d')
            this.cropToCanvas()
            document.body.appendChild(this.canvas)
            this.showCropDialog = true
          }
        }
        var files = e.target.files[0]
        fr.readAsDataURL(files)
      } else {
        this.files = []
        this.getFiles(e)
        if (this.auto) this.uploadFiles()
      }
    },
    getFiles (e) {
      e.stopPropagation()
      e.preventDefault()
      this.files = e.target.files || e.dataTransfer.files
      let _exts = this.ext.split(',')
      let _mimes = []
      if (_exts.length > 0) {
        _exts.forEach(v => {
          if (this.mimes[v] !== undefined) {
            _mimes.push(this.mimes[v])
          }
        })
      }
      for (var i = 0; this.files[i]; i++) {
        if (this.files[i].size > this.limit || !_mimes.includes(this.files[i].type)) {
          this.removeFile(this.files[i].name)
        }
      }
    },
    removeFile (name) {
      var newFiles = []
      for (var i = 0; this.files[i]; i++) {
        if (this.files[i].name !== name) newFiles.push(this.files[i])
      }
      this.files = newFiles
    },
    uploadFiles () {
      if (this.files.length === 0) return false
      for (var i = 0; this.files[i]; i++) {
        (file => {
          var xhr = new window.XMLHttpRequest()
          if (xhr.upload) {
            var formData = new window.FormData()
            formData.append(this.filename, file)
            if (this.params !== undefined) {
              for (let key in this.params)formData.append(key, this.params[key])
            }
            xhr.upload.addEventListener('progress', e => {
              this.percent = Math.floor(e.loaded / e.total * 100)
              console.log('uploadProgress', this.percent)
            }, false)
            xhr.onreadystatechange = e => {
              if (xhr.readyState === 4) {
                let data = xhr.responseText
                if (xhr.status === 200) {
                  if (data.substr(0, 1) === '{') {
                    data = JSON.parse(data)
                  }
                  if (data.result !== undefined) {
                    this.file = data.result
                  }
                  this.$emit('success')
                  if (this.files.length === 0) {
                    console.log('uploadDone')
                  }
                } else {
                  console.log('uploadError', data)
                }
              }
            }
            xhr.open('POST', this.server + this.api, true)
            if (this.header !== undefined) {
              for (let key in this.header)xhr.setRequestHeader(key, this.header[key])
            }
            xhr.withCredentials = false
            xhr.send(formData)
          }
        })(this.files[i])
      }
    },
    cropDragBegin (e) {
      this.drag = true
      this.grabbing = true
      this.beginX = e.pageX - e.target.offsetLeft
      this.beginY = e.pageY - e.target.offsetTop
      if (this.isMobile) {
        if (e.touches.length === 2) {
          this.beginLength = this.beginLength === 0 ? this.cropTouchData(e).length : this.beginLength
        }
        document.addEventListener('touchmove', this.cropDragMove, false)
        document.addEventListener('touchend', this.cropDragEnd, false)
      } else {
        document.addEventListener('mouseover', this.cropDragMove, false)
        document.addEventListener('mouseup', this.cropDragEnd, false)
      }
    },
    cropDragMove (e) {
      if (!this.drag) return false
      // 放大
      if (this.isMobile) {
        if (e.touches.length === 2) {
          this.scaleLength = this.cropTouchData(e).length
          this.scale = Math.min(200, Math.max(100, this.scaleLength / this.beginLength * 100))
          this.cropZoom()
        } else {
          this.scaleX = e.pageX - this.beginX
          this.scaleY = e.pageY - this.beginY
        }
      } else {
        this.scaleX = e.pageX - this.beginX
        this.scaleY = e.pageY - this.beginY
      }
      this.cropLimit()
    },
    cropDragEnd (e) {
      this.drag = false
      this.grabbing = false
      this.cropToCanvas()
      if (this.isMobile) {
        document.removeEventListener('touchmove', this.cropDragMove, false)
        document.removeEventListener('touchend', this.cropDragEnd, false)
      } else {
        document.removeEventListener('mouseover', this.cropDragMove, false)
        document.removeEventListener('mouseup', this.cropDragEnd, false)
      }
    },
    cropToCanvas () {
      this.context.clearRect(0, 0, this.width, this.height)
      // 图像源x坐标
      let sx = Math.round(Math.abs(this.scaleX) * this.img.naturalWidth / this.scaleWidth)
      // 图像源y坐标
      let sy = Math.round(Math.abs(this.scaleY) * this.img.naturalHeight / this.scaleHeight)
      let sw = this.width * this.img.naturalWidth / this.scaleWidth
      let sh = this.height * this.img.naturalHeight / this.scaleHeight
      this.context.drawImage(this.img, sx, sy, sw, sh, 0, 0, this.width, this.height / this.cropGetRatio())
    },
    cropZoom () {
      let s = this.scale / 100
      let osx = this.scaleX - this.width / 2
      let osy = this.scaleY - this.height / 2
      let os
      // 按原始图片比例优先使用小值设置最低值
      if (this.img.naturalWidth > this.img.naturalHeight) {
        os = this.scaleHeight / this.height
        this.scaleHeight = this.height * s
        this.scaleWidth = this.scaleHeight * this.img.naturalWidth / this.img.naturalHeight
      } else {
        os = this.scaleWidth / this.width
        this.scaleWidth = this.width * s
        this.scaleHeight = this.scaleWidth * this.img.naturalHeight / this.img.naturalWidth
      }
      this.scaleX = (osx) * s / os + this.width / 2
      this.scaleY = (osy) * s / os + this.height / 2
      this.cropLimit()
      this.cropToCanvas()
    },
    // 获取多点触控
    cropTouchData (e) {
      if (e.touches.length < 2) return
      let x1 = e.touches[0].pageX
      let x2 = e.touches[1].pageX
      let x3 = (x1 <= x2 ? (x2 - x1) / 2 + x1 : (x1 - x2) / 2 + x2)
      let y1 = e.touches[0].pageY - this.scrollbar.scrollTop
      let y2 = e.touches[1].pageY - this.scrollbar.scrollTop
      let y3 = (y1 <= y2 ? (y2 - y1) / 2 + y1 : (y1 - y2) / 2 + y2)
      return {
        length: Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))),
        x: Math.round(x3),
        y: Math.round(y3)
      }
    },
    // 限制边界
    cropLimit () {
      if (this.scaleX < -(this.scaleWidth - this.width)) this.scaleX = -(this.scaleWidth - this.width)
      if (this.scaleY < -(this.scaleHeight - this.height)) this.scaleY = -(this.scaleHeight - this.height)
      if (this.scaleX > 0) this.scaleX = 0
      if (this.scaleY > 0) this.scaleY = 0
      if (this.scaleHeight === this.height) this.scaleY = 0
      if (this.scaleWidth === this.width) this.scaleX = 0
    },
    // 提交裁剪
    cropOK () {
      let data = this.canvas.toDataURL('image/jpeg', this.quality || 0.8)
      // 没有设置服务器直接返回base64
      if (this.server === '' || this.api === '') {
        this.$emit('input', data)
        this.showCrop = false
        document.body.removeChild(this.canvas)
        this.input.value = ''
        return false
      }
      data = window.atob(data.split(',')[1])
      let aBuffer = new ArrayBuffer(data.length)
      let uBuffer = new Uint8Array(aBuffer)
      for (let i = 0; i < data.length; i++) {
        uBuffer[i] = data.charCodeAt(i)
      }
      let blob = new window.Blob([uBuffer], {type: 'image/jpeg'})
      blob.filename = 'blob.jpg'
      let formData = new window.FormData()
      formData.append(this.filename, blob, 'blob.jpg')
      if (this.params !== undefined) {
        for (let key in this.params)formData.append(key, this.params[key])
      }
      let xhr = new window.XMLHttpRequest()
      if (xhr.upload) {
        xhr.upload.addEventListener('progress', e => {
          this.percent = Math.floor(e.loaded / e.total * 100)
          console.log('uploadProgress', this.percent)
        }, false)
        xhr.onreadystatechange = e => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText)
            /*  this.$emit('change', data.data.img[0].savepath)
              this.$emit('input', data.data.img[0].savepath)*/
              this.$emit('success')
              if (this.files.length === 0) {
                console.log('uploadDone')
              }
            } else {
              console.log('uploadError', data)
            }
          }
        }
        xhr.open('POST', this.server + this.api, true)
        if (this.header !== undefined) {
          for (let key in this.header) xhr.setRequestHeader(key, this.header[key])
        }
        xhr.withCredentials = false
        xhr.send(formData)
      }
      this.showCrop = false
      document.body.removeChild(this.canvas)
      this.input.value = ''
    },
    // 取消裁剪
    cropCancel () {
      this.showCrop = false
      document.body.removeChild(this.canvas)
      this.input.value = ''
    },
    // http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
    cropGetRatio () {
      // var iw = this.img.naturalWidth
      var ih = this.img.naturalHeight
      var canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = ih
      var ctx = canvas.getContext('2d')
      ctx.drawImage(this.img, 0, 0)
      var data = ctx.getImageData(0, 0, 1, ih).data
      // search image edge pixel position in case it is squashed vertically.
      var sy = 0
      var ey = ih
      var py = ih
      while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3]
        if (alpha === 0) {
          ey = py
        } else {
          sy = py
        }
        py = (ey + sy) >> 1
      }
      var ratio = (py / ih)
      return (ratio === 0) ? 1 : ratio
    }
  }
}
</script>