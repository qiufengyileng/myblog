<template>
  <div class="editor-container">
    <bubble-menu :editor="editor">
      <button @click="editor.chain().focus().toggleBold().run()">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()">
        Strike
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()">
      </button>
    </bubble-menu>
    <!--
      从代码结构看，如果 BubbleMenu 组件内部的按钮（如 toggleBold、toggleItalic、toggleStrike）需要通过 editor
       来执行相应的命令，那么这个绑定就是必要的。这些按钮的点击事件处理函数
      （如 @click="editor.chain().focus().toggleBold().run()"）表明它们依赖于 editor 对象来完成实际的操作。
      -->
    <editor-content :editor="editor" ref="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2'
import { Image } from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
// import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import { common, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

const lowlight = createLowlight(common)

const editorExtentions = [
  StarterKit,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6]
  }),
  CodeBlockLowlight.configure({
    lowlight
  }),
  Image
]
// 监听鼠标抬起

export default {
  components: {
    EditorContent,
    BubbleMenu
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      editor: null,
      bubbleMenuShow: false
    }
  },
  methods: {
    pasteLisenter () {
      const _editor = this.$refs.editor.$el
      console.log('editor', _editor)
      _editor.addEventListener('paste', async (e) => {
        e.preventDefault() // 阻止默认粘贴行为，以便自行处理数据
        const clipboardItems = await navigator.clipboard.read()
        console.log('获取到粘贴的项', clipboardItems)
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            if (type.startsWith('image')) {
              const blob = await clipboardItem.getType(type)
              console.log('获取到粘贴的图像（PNG）数据')
              // 这里可以进一步将图像的Blob数据进行处理，比如显示在页面上
              const img = new Image()
              img.src = URL.createObjectURL(blob)
              this.editor.chain().focus().setImage({ src: img.src, alt: 'tips' }).run()
            }
          }
        }
      })
    }
  },
  watch: {
    value (value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      // console.log('isSame', isSame, 'value', value, 'html', this.editor.getHTML())

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },

  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: editorExtentions,
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      }
    })
    this.pasteLisenter()
  },

  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<style >
.tiptap {
  padding: 5px;
  min-height: 500px;
  width: 55vw!important;
  margin: 0 auto;
}

.bubble-menu>button {
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  background: skyblue;
  transition: all 0.2s;
}

.bubble-menu>button:active {
  background: #ccc;
}

.ProseMirror>*+* {
  margin-top: 0.75em;
}

.ProseMirror pre {
  background: #0D0D0D;
  width: 80%;
  margin: 0 auto;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror pre .hljs-comment,
.ProseMirror pre .hljs-quote {
  color: #616161;
}

.ProseMirror pre .hljs-variable,
.ProseMirror pre .hljs-template-variable,
.ProseMirror pre .hljs-attribute,
.ProseMirror pre .hljs-tag,
.ProseMirror pre .hljs-name,
.ProseMirror pre .hljs-regexp,
.ProseMirror pre .hljs-link,
.ProseMirror pre .hljs-name,
.ProseMirror pre .hljs-selector-id,
.ProseMirror pre .hljs-selector-class {
  color: #F98181;
}

.ProseMirror pre .hljs-number,
.ProseMirror pre .hljs-meta,
.ProseMirror pre .hljs-built_in,
.ProseMirror pre .hljs-builtin-name,
.ProseMirror pre .hljs-literal,
.ProseMirror pre .hljs-type,
.ProseMirror pre .hljs-params {
  color: #FBBC88;
}

.ProseMirror pre .hljs-string,
.ProseMirror pre .hljs-symbol,
.ProseMirror pre .hljs-bullet {
  color: #B9F18D;
}

.ProseMirror pre .hljs-title,
.ProseMirror pre .hljs-section {
  color: #FAF594;
}

.ProseMirror pre .hljs-keyword,
.ProseMirror pre .hljs-selector-tag {
  color: #70CFF8;
}

.ProseMirror pre .hljs-emphasis {
  font-style: italic;
}

.ProseMirror pre .hljs-strong {
  font-weight: 700;
}
</style>
