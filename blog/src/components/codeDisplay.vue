<template>
  <div class="code-window">
    <div class="window-controls">
      <div class="control close"></div>
      <div class="control minimize"></div>
      <div class="control maximize"></div>
    </div>
    <pre class="code-content"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  name: 'CodeDisplay',
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'javascript'
    }
  },
  computed: {
    highlightedCode () {
      return hljs.highlight(this.code, {
        language: this.language
      }).value
    }
  }
}
</script>

<style scoped>
.code-window {
  background: #282c34;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.window-controls {
  background: #21252b;
  padding: 10px;
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.close {
  background: #ff5f56;
}

.minimize {
  background: #ffbd2e;
}

.maximize {
  background: #27c93f;
}

.code-content {
  margin: 0;
  padding: 16px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

code {
  color: #abb2bf;
}

/* Preserve whitespace and line breaks */
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
