<template>
  <div id="app">
    <link rel="stylesheet" />
    <keep-alive>
      <router-view :key="+new Date()" />
    </keep-alive>
    <!-- 登录组件 -->
    <LoginComponent />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LoginComponent from '@/components/login/index.vue'
export default {
  name: 'App',
  components: {
    LoginComponent
  },
  computed: {
    ...mapState('setting', ['isNight'])
  },
  created () {
    render(this.isNight)
    this.$store.dispatch('user/fetchPersonalCenterData')
  },
  mounted () {
    // console.log('mounted', document.querySelector('.el-message'))
  },
  watch: {
    isNight () {
      // console.log('watch', this.isNight)
      render(this.isNight)
    }
  } // 监听night的变化,全局设置主题颜色
}
function render (night) {
  const target = document.querySelector('html')
  if (night) {
    target.classList.add('night')
    return
  } // 夜间背景颜色
  target.classList.remove('night')
} // 渲染背景颜色
</script>
<style>
:root {
  --barwidth: 0px;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
span,
div {
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
}
html {
  overflow: scroll;
  position: relative;
  overflow-x: hidden;
}
body {
  width: 100vw;
  margin: 0;
  padding: 0;
}
.text-inverted {
  color: inherit; /* 设置文本颜色 */
  background-color: inherit; /* 设置背景颜色 */
  mix-blend-mode: difference; /* 使用混合模式来反转颜色 */
}
h2 {
  color: inherit !important;
}
.el-message {
  z-index: 999999999999999 !important;
}
/* html::-webkit-scrollbar {
  display: none;
} */
.night {
  background-color: #000000 !important;
  color: #ffffff !important;
}
</style>
