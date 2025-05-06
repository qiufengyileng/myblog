/*eslint-disable padded-blocks*/
/*eslint-disable no-trailing-spaces*/
<template>
  <div class="blog-page" :class="{ 'dark-mode': isNight }">
    <HeaderComponent></HeaderComponent>

    <main class="main-content">
      <div class="hero">
        <p class="hero-title">Blog Title</p>
      </div>
      <div class="blog-body">
        <div class="container" style="flex:2">
          <div class="content-wrapper">
            <div class="articles-section">
              <h2 class="section-title">推荐
                <span style="font-size: small;cursor: pointer;" @click="refresh">
                  <i class="el-icon-refresh" :class="{ 'refresh-active': IsRefresh }"></i>
                刷新</span></h2>
              <div class="article-list">
                <articleList :articles="getArticleList" style="min-height:112vh"></articleList>
                <!-- 分页 -->
                <el-pagination :page-size="6" :pager-count="9" layout="prev, pager, next, jumper" :background="true"
                style="margin-bottom: 1rem;"
                  :total="dataTotal" :current-page="currentPage" @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!-- 侧边栏 -->
        <aside class="sidebar" style="position: sticky;top:30vh">
             <!-- 个人信息 -->
             <div class="sidebar-widget">
            <h3 class="widget-title">个人信息</h3>
            <hr style="opacity: 0.3;">
            <HomePersonComponent></HomePersonComponent>
          </div>
          <!-- 时间 -->
          <div class="sidebar-widget">
            <h3 class="widget-title">
              <Clock></Clock>
            </h3>
          </div>
         <!-- 推荐作者 -->
         <div class="sidebar-widget">
            <h3 class="widget-title">推荐作者</h3>
            <hr style="opacity: 0.3;">
            <p v-for="(item, index) in 5" :key="index">1</p>
          </div>
        </aside>
      </div>
    </main>

    <FooterComponent />

    <button v-if="showToTop" class="to-top-button" @click="scrollToTop">
      <i class="el-icon-top"></i>
    </button>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import Clock from '@/components/clock.vue'
import HomePersonComponent from '@/views/blog/home-Person.vue'
import HeaderComponent from '@/components/header.vue'
import FooterComponent from '@/components/footer.vue'
import articleList from '@/components/articleComponents/articleList.vue'

export default {
  name: 'BlogPage',
  components: {
    Clock,
    HeaderComponent,
    FooterComponent,
    HomePersonComponent,
    articleList
  },
  created () {
    this.$store.dispatch('article/fetchArticleList', this.currentPage)
      .catch(error => {
        console.error('Error fetching article list:', error)
      })
    this.$store.dispatch('home/getDataTotal')
  },
  data () {
    return {
      showToTop: false,
      Timer: '',
      IsRefresh: false
    }
  },
  computed: {
    ...mapState('setting', ['isNight']),
    ...mapGetters('article', ['getArticleList']),
    ...mapState('home', ['currentPage', 'dataTotal'])
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.showToTop = window.scrollY > 400
    },
    // 刷新
    refresh () {
      this.IsRefresh = true
      setTimeout(() => {
        this.IsRefresh = false
        this.$message.success('已是最新')
      }, Math.random() * 1000)
    },
    scrollToTop () {
      const duration = window.innerHeight
      if (window.scrollY > window.innerHeight + 100) {
        window.scrollTo({ top: duration, behavior: 'smooth' })
        return
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    ChangeOnes () {
      this.Timer && clearTimeout(this.Timer)
      this.Timer = setTimeout(() => {
        // 本页刷新
        this.$store.dispatch('article/fetchArticleList', this.currentPage)
          .catch(error => {
            console.log('Error fetching article list:', error)
          })
      }, 300)
    },
    handleCurrentChange (val) {
      // console.log('handleCurrentChange', val)
      // 回到头部
      window.scrollTo({ top: window.innerHeight })
      // 设置当前页码
      this.$store.commit('home/setCurrentPage', val)
      // 请求数据
      this.$store.dispatch('article/fetchArticleList', this.currentPage)

    }
  }
}
</script>

<style scoped>
* {
  list-style: none;
  box-sizing: border-box;
}
.refresh-active {
  animation: spin 1s linear infinite
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
h2 {
  color: inherit;
}

.blog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: '宋体'
}

.main-content {
  margin-top: 60px;
  flex-grow: 1;
}

.hero {
  height: 50vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero::before {
  pointer-events: none;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  /* background-image: url('../../assets/blog/符华.jpg'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #e6e2e22e;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.hero-title {
  font-size: 2rem;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.Cardmark {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  background-color: transparent;
  height: 100%;
  width: 100%;
}
.blog-body{
  display: flex;
  padding:0 5vw;
  justify-content: center;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.articles-section {
  flex: 2;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.article-card {
  position: relative;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(31, 31, 31, 0.1);
  /* transition: all 0.1s ease; */
  cursor: pointer;
}

.article-card:hover {
  /* scale: 1.05; */
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
}

.article-card-night {
  background-color: #4643439c;
  box-shadow: 0 1px 3px rgb(182, 180, 180);
}

.article-card-night:hover {
  box-shadow: 1 4px 6px rgb(182, 180, 180);
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.article-excerpt {
  color: #666;
}

.sidebar {
  flex: 1;
  margin-top: 4rem;
  display: none;
}

.sidebar-widget {
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.widget-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.to-top-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all;
  display: none;
}

.to-top-button:hover {
  transform: scale(1.1);
}

@media (min-width: 1170px) {
  .hero {
    height: 100vh;
  }

  .hero-title {
    font-size: 3rem;
  }

  .content-wrapper {
    flex-direction: row;
  }

  .to-top-button {
    display: block;
  }

  .sidebar {
    margin-top: 0;
    margin-left: 2rem;
    display: block;
  }
}

.clock-container {
  display: flex;
  width: 24vw;
  height: inherit;
}

.clock-display {
  padding: 0;
}

.blog-page.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

.dark-mode .header {
  background-color: #2a2a2a;
}

.dark-mode .nav-link,
.dark-mode .mobile-nav-link {
  color: #f0f0f0;
}

.dark-mode .mobile-menu {
  background-color: #2a2a2a;
}

.dark-mode .article-card,
.dark-mode .sidebar-widget {
  background-color: #2a2a2a;
}

.dark-mode .article-excerpt {
  color: #b0b0b0;
}

.dark-mode .footer {
  background-color: #2a2a2a;
}
</style>
