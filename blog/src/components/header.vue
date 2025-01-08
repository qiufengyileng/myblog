<template>
  <header class="header" :style="nightMode ? { backgroundColor: '#1a1a1a' } : {}">
    <nav class="nav-container">
      <ul class="nav-links">
        <span class="logo">秋风易冷</span>
        <li><router-link to="/blog" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-s-home icon"></i>首页</router-link></li>
        <li><router-link to="/guidang" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-s-order icon"></i>归档</router-link></li>
        <li><router-link to="/more" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-s-fold icon"></i>更多</router-link></li>
        <li><router-link to="/writeArticle" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-edit icon"></i>写作</router-link></li>
        <li><router-link to="/about" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-s-promotion icon"></i>关于</router-link></li>
        <li><router-link to="/personalCenter" :class="['nav-link', { 'nightMode': nightMode }]"><i
              class="el-icon-user-solid icon"></i>个人中心</router-link></li>
      </ul>
      <div class="nav-controls">

        <label class="switch">
          <input type="checkbox" v-model="nightMode">
          <span class="slider round"></span>
        </label>
        <i class="el-icon-arrow-left goBack" @click="$router.go(-1)"></i>
        <button :class="['menu-button', { 'nightMode': nightMode }]" @click="toggleMobileMenu">

          <i class="el-icon-menu"></i>
        </button>
      </div>
    </nav>
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }"
      :style="nightMode ? { backgroundColor: '#1a1a1a' } : {}">
      <button :class="['close-menu', { 'nightMode': nightMode }]" @click="closeMobileMenu">&times;</button>
      <div :class="['mobile-nav-link', { 'nightMode': nightMode }]" @click="changeTheme"><i
          :class="{ 'el-icon-moon': nightMode, 'el-icon-sunny': !nightMode }"></i>{{ !nightMode ? '日间模式' : '夜间模式' }}
      </div>
      <router-link to="/blog" :class="['mobile-nav-link', { 'nightMode': nightMode }]"
        @click.native="closeMobileMenu"><i class="el-icon-s-home icon"></i>首页</router-link>
      <router-link to="/guidang" :class="['mobile-nav-link', { 'nightMode': nightMode }]"
        @click.native="closeMobileMenu"><i class="el-icon-s-order icon"></i>归档</router-link>
      <router-link to="/more" :class="['mobile-nav-link', { 'nightMode': nightMode }]"
        @click.native="closeMobileMenu"><i class="el-icon-s-fold icon"></i>更多</router-link>
      <router-link to="/about" :class="['mobile-nav-link', { 'nightMode': nightMode }]"
        @click.native="closeMobileMenu"><i class="el-icon-s-promotion icon"></i>关于</router-link>
      <router-link to="/personalCenter" :class="['mobile-nav-link', { 'nightMode': nightMode }]"
        @click.native="closeMobileMenu"><i class="el-icon-user-solid icon"></i>个人中心</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data () {
    return {
      isMobileMenuOpen: false
    }
  },
  computed: {
    nightMode: {
      get () {
        return this.$store.state.setting.isNight
      },
      set (value) {
        this.$store.commit('setting/changeNight', value)
      }
    }
  },
  methods: {
    toggleMobileMenu () {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu () {
      this.isMobileMenuOpen = false
    },
    changeTheme () {
      this.$store.commit('setting/changeNight')
    }
  }
}
</script>

<style scoped>
* {
  list-style: none;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  background-color: white;
  height: 10vh;
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  width: 100vw;
  margin: 0 auto;
  display: flex;
  color: inherit;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.45rem !important;
  font-weight: 600;
  margin-right: 7vw;
}

.nav-links {
  display: none;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-left: 2vw;
  text-decoration: none;
  color: #333;
  transition: all 0.1s ease;
}

.nav-link:hover {
  margin-top: -0.6px;
}

.nav-link i {
  margin-right: 0.5rem;
}

.menu-button {
  margin-left: calc(100vw - 9vh);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70%;
  aspect-ratio: 6 / 7;
  background-color: #49493d;
}

.switch {
  margin-right: 4vw !important;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 1rem;
  display: none;
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

.menu-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -51vw;
  width: 51vw;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
}

.mobile-menu.is-open {
  right: 0;
}

.close-menu {
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
  color: #333;
  margin-bottom: 0.5rem;
}

.mobile-nav-link i {
  margin-right: 0.5rem;
}

.goBack {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: block;
}

@media (min-width: 1170px) {
  .nav-links {
    display: flex;
  }

  .menu-button {
    display: none;
  }

  .switch {
    display: block !important;
  }

  .goBack {
    display: none;
  }
}
</style>
