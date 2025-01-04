<template>
  <div>
  <Header style="height:10vh"></Header>
  <div class="profile-container" style="margin-top: 10vh;">
    <header class="profile-header">
      <div class="profile-avatar">
        <img :src="user.avatar" :alt="user.name">
      </div>
      <h1 class="profile-name">{{ user.name }}</h1>
      <p class="profile-bio">{{ user.bio }}</p>
    </header>
    <section class="profile-stats">
      <div class="stat-item" style="cursor: pointer;">
        <span class="stat-value">{{ user.posts }}</span>
        <span class="stat-label">发表文章</span>
      </div>
      <div class="stat-item" style="cursor: pointer;">
        <span class="stat-value">{{ user.followers }}</span>
        <span class="stat-label">粉丝</span>
      </div>
      <div class="stat-item" style="cursor: pointer;">
        <span class="stat-value">{{ user.following }}</span>
        <span class="stat-label">关注</span>
      </div>
    </section>
    <section class="profile-info">
      <h2>关于作者</h2>
      <p>{{ user.about }}</p>
      <h2>联系我</h2>
      <p>邮箱: {{ user.email }}</p>
      <p>电话: {{ user.location }}</p>
    </section>
  </div>
</div>
</template>

<script>
import Header from '@/components/header.vue'
import { mapState } from 'vuex'
export default {
  name: 'PersonPage',
  components: {
    Header
  },
  computed: {
    ...mapState('setting', ['isNight'])
  },

  data () {
    return {
      user: {
        name: '约翰・多伊',
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.yp-D-KHI3e2nN4eMBJcEVAAAAA?rs=1&pid=ImgDetMain',
        bio: '网页开发人员兼设计师',
        posts: 42,
        followers: 1337,
        following: 420,
        about: '热衷于打造美观且实用的网页应用程序。',
        email: 'john.doe@example.com',
        location: '13170913475'
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-name {
  margin: 10px 0;
  font-size: 24px;
  /* color: #333; */
}

.profile-bio {
  /* color: #666; */
  font-style: italic;
}
.nightMode{
  color: #fff !important;
  background-color: inherit!important;;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  /* background-color: #f5f5f5; */
  padding: 15px;
  border-radius: 5px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: bold;
  /* color: #333; */
}

.stat-label {
  font-size: 14px;
  /* color: #666; */
}

.profile-info {
  /* background-color: #fff; */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 0;
}

.profile-info p {
  /* color: #666; */
  line-height: 1.6;
}
</style>
