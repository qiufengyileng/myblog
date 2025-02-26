<template>
  <div class="editor-container">
    <div class="header">
      <input type="text" class="title" placeholder="请输入文章标题..." v-model.trim="articleData.title">
      <div class="right">
        <!-- 标签选择 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            标签选择<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 400px;">
           <ChooseTag 
            @update:dynamicTags="articleData.tags = $event"
           />
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="saveArticle" :disabled="saveArticleDisabled">保存</el-button>
        <el-button @click="saveDraft">草稿</el-button>
        <img :src="avatar" alt="用户头像" title='前往个人中心' class="avatar" @click="$router.push('/personalCenter')">
      </div>
    </div>
    <Toolbar style="border-bottom: 1px solid #ccc;border-top:1px solid #ccc ;" :editor="editor"
      :defaultConfig="toolbarConfig" :mode="mode" :v-if="showToolbar" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="articleData.html" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="onCreated" />
  </div>
</template>
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import { fetchSaveArticle } from '@/api/article'
import dayjs from 'dayjs'
import ChooseTag from '@/views/write/chooseTag.vue'
import '@wangeditor/editor/dist/css/style.css'

export default Vue.extend({
  components: { Editor, Toolbar, ChooseTag },
  created () {
    this.articleData = { ...this.$store.state.write.articleData }
    console.log('articleData', this.articleData)
    this.saveArticleDisabled = this.$store.state.write.saveArticleDisabled
  },
  data () {
    return {
      editor: null,
      articleData: {
      },
      showToolbar: true,
      toolbarConfig: {
        excludeKeys: ['fullScreen', 'group-video'],
        insertKeys: ['changImgeSize']
      },
      editorConfig: {
        placeholder: '请输入内容...',
        image: {
        },
        computed: {
          
        },
        MENU_CONF: {
          uploadImage: {
            customUpload: async (imageFile, insertImgFn) => {
              // 检查文件大小（比如限制为 2MB）
              const MAX_SIZE = 2 * 1024 * 1024 // 2MB
              if (imageFile.size > MAX_SIZE) {
                this.$message.error('图片大小不能超过2MB')
                return
              }

              try {
                // 压缩图片
                const compressedFile = await this.compressImage(imageFile)
                const reader = new FileReader()
                reader.onload = (e) => {
                  const base64Url = e.target.result
                  insertImgFn(base64Url)
                }
                reader.readAsDataURL(compressedFile)
              } catch (error) {
                this.$message.error('图片处理失败')
                console.error(error)
              }
            }
          },
          uploadVideo: {
            customUpload: (videoFile, insertVideoFn) => {
              // 检查文件大小（比如限制为 10MB）
              const MAX_SIZE = 10 * 1024 * 1024 // 10MB
              if (videoFile.size > MAX_SIZE) {
                this.$message.error('视频大小不能超过10MB')
                return
              }

              const reader = new FileReader()
              reader.onload = (e) => {
                const base64Url = e.target.result
                insertVideoFn(base64Url)
              }
              reader.readAsDataURL(videoFile)
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  computed: {
    avatar () {
      return this.$store.state.user.userData.avatar
    }
  },
  watch: {
    title: {
      handler (newValue, oldValue) {
        if (newValue.trim().length > 50) {
          this.$message.warning('标题过长')
          this.title = oldValue
        }
      }
    }
  },
  methods: {
    _initRender () {
    
    },
    _outRender () {
      
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // 配置config
      console.log('editor', editor)
      this.$nextTick(() => {
        // 初始化
        this.getConfig()

      })

      this.getHTML()
    },
    getHTML () {
      console.log('getHTML', this.editor.getHtml())
      // this.editor.disable()
    },
    getConfig () {
      const editor = this.editor // 获取 editor 实例
      if (editor == null) return

      const toolbar = DomEditor.getToolbar(this.editor)
      console.log('toolbar', toolbar)
      const config = toolbar.getConfig()
      console.log('config', config.toolbarKeys)
    },
    // 禁止滚动（保证在背景颜色为白色时，滚动条不显示）
    preventScroll () {
      document.querySelector('html').style.overflowY = 'hidden'

    },
    // 允许滚动
    allowScroll () {
      document.querySelector('html').style.overflowY = 'auto'

    },
    beforeSaveArticle () {
      if (this.articleData.title.trim() === '') {
        this.$message.error('请输入文章标题')
        return false
      }
      if (this.editor.getText().trim() === '') {
        this.$message.error('请输入文章内容')
        return false
      }
      if (this.articleData.tags.length === 0) {
        this.$message.error('请选择文章标签')
        return false
      }
      if (this.editor.getText().trim().length < 100) {
        this.$message.error('文章内容过短')
        return false
      }
      return true
    },
    async saveArticle () {
      // 保存文章前置判断
      if (!this.beforeSaveArticle()) return
      const data = this.editor.getHtml().trim()
      const content = this.editor.getText().trim()
      
      try {
        // 对内容进行基本处理
        const paragraphs = data.replace(/'/g, "\\'").replace(/"/g, '\\"') // 转义引号
        
        const res = await fetchSaveArticle({
          paragraphs: paragraphs,
          content: content.slice(0, 50).replace(/'/g, "\\'").replace(/"/g, '\\"'), // 转义引号
          title: this.articleData.title.replace(/'/g, "\\'").replace(/"/g, '\\"'), // 转义标题中的引号
          publishedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          tags: this.articleData.tags,
          author: this.$store.state.user.username
        })
        if (res.message === 'ok') {
          this.$message.success('保存成功')
          // 保存成功后，禁用可写模式
          // this.editor.disable()
          // toolbar不可见
          this.showToolbar = false
          // 保存数据
          this.storeData()
          // 保存成功后，禁用保存按钮
          this.$store.commit('write/setSaveArticleDisabled', true)
        } else {
          if (res.message === '超过最大文章数，添加文章失败') {
            this.$message.error('每日限制3篇文章,请明天再试')
            return
          }
          this.$message.error('保存失败')
        }

      } catch (error) {
        console.log('error', error)
      }
    },
    saveDraft () {
      const html = this.editor.getHtml()
      console.log('saveDraft', html)
      this.storeData()
      this.$message.warning('草稿箱部分未完成！！！')
    },
    storeData () {
      this.$store.commit('write/setArticleData', this.articleData)
    },
    // 图片压缩方法
    compressImage (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height
            
            // 如果图片大于 1280px，按比例缩小
            const MAX_WIDTH = 1280
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width)
              width = MAX_WIDTH
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            
            // 转换为 blob
            canvas.toBlob((blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }))
            }, 'image/jpeg', 0.7) // 压缩质量 0.7
          }
          img.onerror = reject
          img.src = e.target.result
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }
  },
  mounted () {
    this.preventScroll()
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
    // 允许滚动
    this.allowScroll()
    this._outRender()
  },
  beforeRouteLeave (to, from, next) {
    // 允许滚动
    this.allowScroll()
    this._outRender()
    // 保存数据
    this.storeData()
    next()
  }
})
</script>

<style lang="scss" scoped>
//w-e-image-container
// :deep(.w-e-image-container){

// }
html,body,#app{
  background: #fff!important;
}
.el-tag{
  cursor: pointer;
}
video {
  width: 80%;
  aspect-ratio: 16 / 9;
}

.editor-container {
 min-height: 100vh;
  width: 100%;
  margin-top:-8px;
  background: #fff;
  margin-left: -7px;

  .header {
    height: 70px;
    padding-left: 50px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;

    .title {
      color: inherit;
      border: none;
      outline: none;
      width: 100%;
      font-size: 22px;
    }

    .right {
      display: flex;
      align-items: center;

      .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
        width: 100px;
      }

      button {
        height: 38px;
        aspect-ratio: 2 / 1;
      }

      .avatar {
        margin: 0 20px;
        cursor: pointer;
        width: 60px;
        outline: 1px solid #ccc;
        aspect-ratio: 1/1;
        border-radius: 50%;

        &:active {
          outline: 2px solid #ccc;
        }
      }
    }
  }
}

::v-deep li[data-value="header1"],
::v-deep li[data-value="header5"],
::v-deep li[data-value="header3"] {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .editor-container {
    width: 100%;
  }
}
</style>
