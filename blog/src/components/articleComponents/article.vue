<template>
   <article >
    <h1 id="title">{{articleData.title}}</h1>
    <div v-html="articleData.paragraphs"></div>
  </article>
</template>

<script>
import hljs from 'highlight.js'
import addCodeControl from '@/utils/codeControl'
const themes = {
  github: `
  pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}

code.hljs {
  padding: 3px 5px
}

/*!
  Theme: GitHub
  Description: Light theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-light
  Current colors taken from GitHub's CSS
*/
.hljs {
  color: #24292e;
  background: #fff
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
  color: #d73a49
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
  color: #6f42c1
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-variable {
  color: #005cc5
}

.hljs-meta .hljs-string,
.hljs-regexp,
.hljs-string {
  color: #032f62
}

.hljs-built_in,
.hljs-symbol {
  color: #e36209
}

.hljs-code,
.hljs-comment,
.hljs-formula {
  color: #6a737d
}

.hljs-name,
.hljs-quote,
.hljs-selector-pseudo,
.hljs-selector-tag {
  color: #22863a
}

.hljs-subst {
  color: #24292e
}

.hljs-section {
  color: #005cc5;
  font-weight: 700
}

.hljs-bullet {
  color: #735c0f
}

.hljs-emphasis {
  color: #24292e;
  font-style: italic
}

.hljs-strong {
  color: #24292e;
  font-weight: 700
}

.hljs-addition {
  color: #22863a;
  background-color: #f0fff4
}

.hljs-deletion {
  color: #b31d28;
  background-color: #ffeef0
}
  `,
  anOldHope: `
  pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}

code.hljs {
  padding: 3px 5px
}

/*!
  Theme: An Old Hope – Star Wars Syntax
  Author: (c) Gustavo Costa <gusbemacbe@gmail.com>
  Maintainer: @gusbemacbe

  Original theme - Ocean Dark Theme – by https://github.com/gavsiu
  Based on Jesse Leite's Atom syntax theme 'An Old Hope'
    https://github.com/JesseLeite/an-old-hope-syntax-atom
*/
.hljs {
  background: #1c1d21;
  color: #c0c5ce
}

.hljs-comment,
.hljs-quote {
  color: #b6b18b
}

.hljs-deletion,
.hljs-name,
.hljs-regexp,
.hljs-selector-class,
.hljs-selector-id,
.hljs-tag,
.hljs-template-variable,
.hljs-variable {
  color: #eb3c54
}

.hljs-built_in,
.hljs-link,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-params,
.hljs-type {
  color: #e7ce56
}

.hljs-attribute {
  color: #ee7c2b
}

.hljs-addition,
.hljs-bullet,
.hljs-string,
.hljs-symbol {
  color: #4fb4d7
}

.hljs-section,
.hljs-title {
  color: #78bb65
}

.hljs-keyword,
.hljs-selector-tag {
  color: #b45ea4
}

.hljs-emphasis {
  font-style: italic
}

.hljs-strong {
  font-weight: 700
}`
}
export default {
  name: 'articlePage',
  themeSet: false,
  articleSet: false,
  props: {
    articleData: {
      type: Object,
      default: null
    }
  },
  computed: {
    isNight () {
      return this.$store.state.setting.isNight
    }
  },
  watch: {
    isNight: {
      handler (newVal) {
        if (newVal) {
          this.currentTheme = 'anOldHope'
        } else {
          this.currentTheme = 'github'
        }
        this.codeStyle()
      },
      immediate: true
    }
  },
  data () {
    return {
      codeControl: false,
      currentTheme: 'github'
    }
  }, 
  methods: {
    async changeTheme () {
      if (this.currentTheme === 'github') {
        this.currentTheme = 'anOldHope'
      } else {
        this.currentTheme = 'github'
      }
      // 更新主题
      this.codeStyle()
    },
    codeStyle () {
      // 如果已经存在codeStyle,则更新
      if (document.getElementById('codeStyle')) {
        document.getElementById('codeStyle').innerHTML = themes[this.currentTheme]
      } else {
        // 如果codeStyle不存在,则创建
        const codeStyle = document.createElement('style')
        codeStyle.id = 'codeStyle'
        codeStyle.innerHTML = themes[this.currentTheme]
        document.head.appendChild(codeStyle)
      }
      
    }
  },
  
  async mounted () {
   
    // 初始加载默认主题
    this.codeStyle()
    // 监听主题切换
    document.addEventListener('changeTheme', () => {
      // console.log('切换主题')
      this.changeTheme()
    })
  },
  updated () {
    // 添加控键,只添加一次
    if (!this.themeSet) {
      this.themeSet = true
      this.$nextTick(() => {
        const elements = document.querySelector('article').querySelectorAll('pre ')
        elements.forEach((element) => {
          addCodeControl(element)
        })
      })
    }
    // 更新时高亮代码
    hljs.highlightAll()
    // 更新时添加标题id,只添加一次
    if (!this.articleSet) {
      this.articleSet = true
      const data = document.querySelector('article').querySelectorAll('h2')
      data.forEach((h, index) => {
        h.setAttribute('data-id', ++index)
      })
    }
  },
  beforeUnmount () {
    document.removeEventListener('changeTheme', this.changeTheme)
  }
}
</script>

<style scoped>
article {
  padding: 2vw 4vw;
  background-color: #dcf1a2;
  border-radius: 0.5vw;
  font: 1em '宋体';

}

::v-deep .hljs-subst {
    color: #cf51e4!important;
}
#title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1em;
}
::v-deep p span,::v-deep li span {
 color: inherit!important;
 background-color: inherit!important;
}
/* ::v-deep code {
  background-color: inherit!important;
  color: inherit!important;
} */
section {
  margin: 1em 0;
  text-indent: 2em;
}
</style>
