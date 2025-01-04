<template>
  <div>
    <header id="header">
      <!-- pc端的菜单栏 -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-logo">
            <a href="/">秋风易冷</a>
          </div>
          <ul class="navbar-menu">
            <li><router-link to="/blog" class="navbar-item"> 首页</router-link></li>
            <li><router-link to="/writeArticle" class="navbar-item">文章</router-link></li>
            <li><router-link to="/about" class="navbar-item">关于</router-link></li>
            <li><router-link to="/contact" class="navbar-item">联系我们</router-link></li>
            <label class="switch">
          <input type="checkbox" v-model="nightMode">
          <span class="slider round"></span>
        </label>
          </ul>

        </div>
      </nav>
      <!-- 快速导航栏按钮 -->
      <button class="quicklyBarButton" @click="Toclose">
        大纲
      </button>
      <i class="el-icon-arrow-left" @click="$router.go(-1)" style="margin-left: 0.5rem;"></i>
      <!-- 移动端的菜单栏 -->
      <nav class="el-icon-menu navbar-mobile" @click="ifRightClose">
        <!-- <i class="" style="font-size: 2rem;"></i> -->
      </nav>
      <div class="navbar-mobile-container">
        <div class="navbar-mobile-toggle" :style="!isNight ? 'background-color: white' : ''">
          <i style="width: 1.3rem;font-size: 1.3rem;position: relative;top: 1rem;left: 1rem;" @click="ifRightClose">x</i>
          <!-- 关闭按钮 -->
          <div class="navbar-mobile-items">
            <li>
              <div class="toggle-line" @click="changeTheme"><i
                  :class="{ 'el-icon-moon ': isNight, 'el-icon-sunny': !isNight }"></i>{{ !isNight ? '日间模式' : '夜间模式' }}</div>
            </li>
            <li><router-link to="/blog" class="toggle-line"><i class="el-icon-s-home"></i>返回首页</router-link></li>
            <li><router-link to="/writeArticle" class="toggle-line"> <i class="el-icon-s-fold"></i> 更多文章</router-link>
            </li>
            <li><router-link to="/person" class="toggle-line"> <i class="el-icon-user"></i>个人中心</router-link></li>
            <li><router-link to="/about" class="toggle-line"> <i class="el-icon-info"></i>关于博客</router-link></li>
            <li><router-link to="/contact" class="toggle-line"> <i class="el-icon-s-promotion"></i>联系我们</router-link>
            </li>
          </div>
        </div>
      </div>
      <div style="z-index: 999!important;" class="drawer" :style="!isNight ? 'background-color: white' : ''">
        <i @click="toClose">
          <quicklyBar id="quicklyBar2" v-if="starTrendering"></quicklyBar>
        </i>
      </div>
    </header>
    <main>
      <!-- 快速导航栏 -->
       <div style="flex: 1;">
      <quicklyBar id="quicklyBar1" v-if="starTrendering">
        <div class="mask"></div>
      </quicklyBar>
    </div>
      <!-- 文章内容 -->
      <Article id="Article" :articleData="articleData" :style="isNight ? 'background-color: #222122' : ''"></Article>
      <aside class="pc-aside-nav"></aside>
    </main>
    <footer :class="['footer',{'dark-mode-footer': isNight}]">
      <div class="container">
        <p class="footer-text">© 2024 秋风易冷</p>
      </div>
    </footer>
  </div>
</template>

<script>
import quicklyBar from '@/components/articleComponents/quicklyBar.vue'
import Article from '@/components/articleComponents/article.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'articlePage',
  components: {
    quicklyBar,
    Article
  },
  data () {
    return {
      drawer: false,
      rightClose: true,
      starTrendering: false
      // 是否开始渲染,因为异步获取文章数据，所以需要等待数据获取才可以拿到dom节点进行操作，所以通过这个来控制
      // 改成true，页面会用一个闪动，但是可以正常显示
    }
  },
  async created () {
    console.log('进入articlePage组件')
    await this.$store.dispatch('article/fetchArticleById', this.$route.query.id)
  },
  computed: {
    ...mapGetters('article', ['getFullArticle']),
    ...mapState('setting', ['isNight']),
    nightMode: {
      get () {
        return this.isNight
      },
      set (value) {
        this.$store.commit('setting/changeNight')
      }
    },
    articleData () {
      console.log('articleData', this.getFullArticle)
      return this.getFullArticle
    }
  },
  watch: {

    drawer (stauts) {
      if (stauts) {
        document.querySelector('.drawer').classList.add('close')
        document.querySelector('html').style.overflow = 'hidden'
        if (this.rightClose) {
          setTimeout(() => {
            document.querySelector('.navbar-mobile-container').style.transition = 'all 1s'
            document.querySelector('.navbar-mobile-container').style.transform = 'translateX(100%)'
          }, 100)
        }
        return
      }
      document.querySelector('.drawer').classList.remove('close')
      document.querySelector('html').style.overflow = 'auto'
    },
    rightClose (stauts) {
      if (!stauts) {
        document.querySelector('html').style.overflow = 'hidden'
        return
      }
      document.querySelector('html').style.overflow = 'auto'
    },
    articleData (newValue) {
      this.starTrendering = newValue
    }
    // '$route' (to, from) {
    //   this.fetchArticleData(to.params.id)
    // }
  },
  methods: {
    changeTheme () {
      this.$store.commit('setting/changeNight')
    },
    Toclose () {
      this.drawer = !this.drawer
      if (!this.rightClose) {
        this.rightClose = !this.rightClose
      }
    },
    changeNavClose () {
      if (!this.rightClose) {
        this.ifRightClose()
      }
      this.drawer = !this.drawer
    },
    toClose (e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'LI') {
        this.drawer = false
      }
    }, // 在快速导航栏中点击a标签或者li标签时，关闭侧边栏
    ifRightClose () {
      this.rightClose = !this.rightClose
      if (this.rightClose) {
        document.querySelector('.navbar-mobile-container').style.transition = 'all 1s'
        document.querySelector('.navbar-mobile-container').style.transform = 'translateX(100%)'
        return
      }
      if (this.drawer) {
        this.drawer = false
      }
      document.querySelector('.navbar-mobile-container').style.transition = 'all 0.5s'
      document.querySelector('.navbar-mobile-container').style.transform = 'translateX(-100%)'
    }
  },
  destroyed () {
    console.log('离开articlePage组件')
    document.querySelector('html').style.overflow = 'auto'
    this.$store.commit('article/setFullArticle', null)
  }
}
</script>

<style scoped>
* {
  --height1: 10vh;
  list-style: none;
}

.navbar {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1rem 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

.navbar-menu {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

.navbar-item:hover {
  background-color: #555;
}

.quicklyBarButton {
  display: none
}

#header {
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  top: -0.5vh;
  left: 0;
  height: var(--height1);
  /* background-color: #f3baba; */
}

main {
  display: flex;
  justify-content: space-between;
  margin-top: calc(var(--height1) + 4vh);
  /*calc(var(--height1) + 4vh)要加空格  */
}

#footer {
  width: 100%;
  height: var(--height1);
}

#quicklyBar1 {
  position: sticky;
  width: 100%;
  top: var(--height1);
  height: 60vh;
  min-width: 14vw;
  /* margin-top: var(--height2); */
}

.pc-aside-nav {
  flex: 1;
  display: block;
}
.switch {
  margin-right: 4vw !important;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 1rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.nightMode {
  color: white !important;
  ;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked+.slider {
  background-color: #636668;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
  background-color: skyblue;
}

.slider.round:before {
  border-radius: 50%;
}
.drawer {
  display: none;
}

#Article {
  background-color: #f4f4f4;
  flex: 3;
  width: 50vw;
}

.Article_night {
  background-color: #222122;
}

.navbar-mobile {
  display: none;
}
.footer {
  /* background-color: #f8f8f8; */
  background-color: #f1f1f180;
  padding: 1.8rem 0;
}

.footer-text {
  text-align: center;
}
.navbar-mobile-container {
  display: none
}
.dark-mode-footer {
  background-color: #2a2a2a;
}
.el-icon-arrow-left{
  display: none;
}
@media screen and (max-width:600px) {
  * {
    --height1: 8vh;
  }

  #header {
    left: 0;
    justify-content: space-between;
    background-color: #555;
  }

  .el-drawer.ltr {
    /* background-color: beige; */
  }
  .el-icon-arrow-left{
  display: block;
}
  #quicklyBar1 {
    display: none;
  }

  main {
    justify-content: center;
  }

  #quicklyBar2 {
    width: 100vw !important;
    height: 80vh;
    overflow-y: scroll;
  }

  #Article {
    width: 90vw;
  }

  .quicklyBarButton {
   position: absolute;
   left: 2rem;
    margin-left: 1vh;
    width: 2vw;
    height: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drawer {
    display: block;
    position: relative;
    position: fixed;
    min-width: 40vw;
    max-width: 60vw;
    height: 100vh;
    margin-top: -0.48vh;
    left: -100%;
    overflow-x: hidden;
    overflow-y: auto;
    top: var(--height1);
    background-color: inherit;
    transition: all 0.3s;
  }

  .pc-aside-nav {
    display: none;
  }

  .navbar-mobile {
    display: block;
    width: 2rem;
    font-size: 2rem;
    aspect-ratio: 1 / 1;
    margin-right: 5%;
    /* 宽高比设置盒子大小 */
    /* background-color: green; */
    cursor: pointer;
    transition: all 0.2s !important;
  }

  .navbar {
    display: none;
  }

  .quicklyBarButton {
    width: 10vw;
    height: 7vw;
  }

  .close {
    left: 0%;
  }

  /deep/ .el-drawer {
    background-color: inherit;
  }

  /deep/.el-drawer__close-btn {
    position: absolute;
    right: 4%;
    top: 2vh;
    width: 6% !important;
    aspect-ratio: 1 / 1 !important;
  }

  .navbar-mobile-container {
    position: fixed;
    display: flex;
    flex-direction: row-reverse;
    right: -100%;
    top: var(--height1);
    width: 100vw;
    height: 100vh;
  }

  .navbar-mobile-toggle {
    width: 50%;
    height: 100%;
    margin-top: -0.4vh;
    background: #2a2a2a;
  }

  .toggle-line {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    text-decoration: none;
    /* color: #; */
    margin-bottom: 0.5rem;
  }

  .navbar-mobile-items {
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    /* margin-top: -2rem; */
  }

  .moblie-close {
    align-self: flex-start;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 0.6rem;
  }
}

@media screen and (max-width:420px) {
  .quicklyBarButton {
    width: 12vw;
    height: 7vw;
    font-size: 0.7rem;
  }

}
</style>
