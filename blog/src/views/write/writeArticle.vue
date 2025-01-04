<template>
  <div class="editor-container">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
  </div>
</template>
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

export default Vue.extend({
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      console.log('editor', editor)
      this.getConfig()

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
      console.log('config', config)
    }
  },
  mounted () {
    
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style lang="sass" scoped>
.editor-container {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
}
@media screen and (max-width: 768px) {
  .editor-container {
    width: 100%;
  }
}
</style>
