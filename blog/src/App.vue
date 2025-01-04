<template>
  <div id="app">
    <link rel="stylesheet">
    <keep-alive>
      <router-view :key="+new Date()"/>
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
    const style = document.createElement('style')
    document.head.appendChild(style)
    console.log('document', document)
    render(this.isNight)
    this.$store.dispatch('user/fetchPersonalCenterData')
  },
  mounted () {
    console.log('mounted', document.querySelector('.el-message'))
  },
  watch: {
    isNight () {
      console.log('watch', this.isNight)
      render(this.isNight)
    }
  }// 监听night的变化,全局设置主题颜色
}
function render (night) {
  const style = document.querySelector('style')
  console.log('style', style)
  if (night) {
    style.innerHTML = ` html{
  color: white!important;
} 
   body{
      background-color: #000000ed;

    }
  `
    return
  }// 夜间背景颜色
  style.innerHTML = `
  html{
  color: #000!important;
}
    body{
      background-color: white;
    }`
}// 渲染背景颜色
</script>
<style>
html{
  overflow: scroll;
  overflow-x: hidden;
}
body{
  width: 100vw;
}
h2{
  color: inherit !important;
}
.el-message{
  z-index: 999999999999999999999999999999999!important;
}
/* html::-webkit-scrollbar {
  display: none;
} */
 
</style>
