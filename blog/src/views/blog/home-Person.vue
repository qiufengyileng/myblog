<template>
  <!-- 已经登入所展示的用户信息 -->
  <div class="container-login" v-if="true">
    <div class="avatar-container">
      <div class="avatar">
        <img :src="getUserPersonalData?.avatar || require('@/assets/blog/avatar未登入.png')" alt="张三的头像">
      </div>
      <p class="name">{{ getUserPersonalData?.userName || '未登录' }}</p>
      <!-- 未登入显示的操作 -->
      <div class="action" v-if="!getUserPersonalData">
        <el-button size="default" type="text" icon="el-icon-postcard" class="edit-button" @click="loginEnter">登入</el-button>
      </div>
      <!-- 登入显示的操作 -->
      <div class="action" v-else>
        <el-button size="small" type="text" icon="el-icon-edit" class="edit-button" @click="edit">编辑</el-button>
        <span style="margin: 0 3px;">/</span>
        <el-button size="small" type="text" class="edit-button" @click="loginOut">退出</el-button>
      </div>
    </div>

    <p class="profession">{{ '职业:' + (getUserPersonalData?.profession || '暂无信息') }}</p>
    <p class="description">{{ getUserPersonalData?.introduction || '暂无信息' }}</p>
    <!-- 社交链接 -->
    <div class="social-links">
      <a href="https://github.com" target="_blank" title="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
          </path>
        </svg>
      </a>
      <!-- <a href="https://twitter.com" target="_blank" title="Twitter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
          </path>
        </svg>
      </a> -->
      <a href="https://linkedin.com" target="_blank" title="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
      <a href="mailto:zhangsan@example.com" title="Email">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>
    </div>
  </div>
  <!-- 未登入所展示的用户信息 -->
  <div class="container-no-login" v-else>
    <p>未登入</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomePersonComponent',
  computed: {
    ...mapGetters('user', ['getUserPersonalData'])
  },
  methods: {
    edit () {
      this.$router.push('/personalCenter')
    },
    loginOut () {
      this.$store.dispatch('login/loginOut')
    },
    loginEnter () {
      this.$store.commit('login/setVisible', true)
    }
  },
  mounted () {
    console.log('getUserPersonalData', this.getUserPersonalData)
  }
}
</script>
<style lang="scss" scoped>
// 引入字体样式
@import url('@/style/Roboto.css');
$background-color: #f7f7f7;
$card-background: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.1);
$hover-shadow-color: rgba(0, 0, 0, 0.15);
$transition-time: 0s;

.container-login {
  font-family: 'Roboto', sans-serif;
  background-color: inherit;
  padding: 30px;
  text-align: center;
  color: inherit;
  transition: all $transition-time ease;

  .avatar-container {
    position: relative;
    display: flex;
    align-items: end;

    .avatar {
      width: 100px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      overflow: hidden;
      margin-left: -20px;
      margin-right: 1rem;
      border: 5px solid $card-background;
      box-shadow: 0 0 20px $shadow-color;
      transition: all $transition-time ease;

      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        transition: all $transition-time ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .name {
      margin-bottom: 15px;
      font-size: 17px;
      font-family: '宋体';
      font-weight: 600;
    }

    .action {
      position: absolute;
      right: 0;
      top: 0;
      .edit-button {
        background-color: transparent;
        color: inherit;
        border: none;
      }
    }
  }

  .profession {
    font-size: 18px;
    color: inherit;
    margin-bottom: 20px;
    font-weight: 300;
  }

  .description {
    font-size: 16px;
    color: inherit;
    line-height: 1.6;
    margin-bottom: 25px;
    padding: 0 10px;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 15px;

    a {
      color: inherit;
      text-decoration: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      transition: all $transition-time ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 10px $shadow-color;
      }

      &:nth-child(1) {
        background-color: #333;
      }

      &:nth-child(2) {
        background-color: #1DA1F2;
      }

      &:nth-child(3) {
        background-color: #0077B5;
      }

      &:nth-child(4) {
        background-color: #EA4335;
      }
    }
  }
}

.container-no-login {
  font-family: 'Roboto', sans-serif;
  background-color: inherit;
  padding: 30px;
  text-align: center;
  color: inherit;
}
</style>
