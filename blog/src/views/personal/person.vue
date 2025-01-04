<template>
  <div>
    <Header style="height:10vh"></Header>
  <div class="personal-center" style="margin-top: 10vh;">
    <header class="header">
      <h1>个人中心</h1>
    </header>
    <div :class="['content',{'nightMode':isNight}]">
      <div class="profile-section">
        <div class="avatar-container">
          <img :src="user.avatar" :alt="user.userName" class="avatar">
          <button @click="changeAvatar" class="change-avatar-btn">更换头像</button>
        </div>
        <div class="info-container">
          <div class="info-item">
            <label>用户名：</label>
            <input v-model="user.userName"  type="text">
          </div>
          <div class="info-item">
            <label>邮箱：</label>
            <input v-model="user.email" type="email">
          </div>
          <div class="info-item">
            <label>电话：</label>
            <input v-model="user.tel" type="tel">
          </div>
        </div>
      </div>
      <div class="bio-section">
        <h2>个人简介</h2>
        <textarea v-model="user.introduction" rows="4"></textarea>
      </div>
      <div class="privacy-section">
        <h2>隐私设置</h2>
        <div class="privacy-item">
          <label>
            <input type="checkbox" v-model="user.public_email"> 公开邮箱
          </label>
        </div>
        <div class="privacy-item">
          <label>
            <input type="checkbox" v-model="user.public_tel"> 公开电话
          </label>
        </div>
      </div>
      <div class="account-section">
        <h2>账户安全</h2>
        <button @click="changePassword" class="change-password-btn">修改密码</button>
      </div>
      <div class="actions">
        <button @click="saveChanges" class="save-btn">保存更改</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Header from '@/components/header.vue'
import { mapState } from 'vuex'

export default {
  name: 'PersonalCenter',
  components: {
    Header
  },
  created () {
    if (!this.userData) {
      this.$store.dispatch('user/fetchPersonalCenterData')
    }
    console.log('this.userData', this.user)
    this.chageData = { ...this.user }
  },
  data () {
    return {
      chageData: null
    }
  },
  computed: {
    ...mapState('setting', ['isNight']),
    ...mapState('user', ['userData']),
    user () {
      return this.userData
    }
  },
  watch: {
    user: {
      deep: true,
      handler (newValue) {
        for (const key in newValue) {
          if (key === 'public_email' || key === 'public_tel') {
            if (newValue[key] === 1 || newValue[key] === 0) continue
            newValue[key] = newValue[key] === true ? 1 : 0
          }
        }
        console.log('newValue', newValue)
        this.chageData = newValue
        console.log('this.chageData', this.chageData)
      }
    }
  },
  methods: {
    changeAvatar () {
      // 实现更换头像的逻辑
      console.log('更换头像')
    },
    changePassword () {
      // 实现修改密码的逻辑
      console.log('修改密码')
    },
    saveChanges () {
      this.$store.dispatch('user/fetchSaveUserData', this.chageData)
    }
  }
}
</script>

<style scoped>
.personal-center {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color:inherit;
}

.content {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.nightMode{
  background-color: #6e6b6b3d;
  border-color: black;
}
.profile-section {
  display: flex;
  margin-bottom: 30px;
}

.avatar-container {
  flex: 0 0 200px;
  text-align: center;
}
input,textarea{
  background-color: inherit!important;;
  color: inherit!important;;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.change-avatar-btn {
  background-color: #4CAF50;
  color:inherit;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.info-container {
  flex: 1;
}

.info-item {
  margin-bottom: 15px;
}

.info-item label {
  display: block;
  margin-bottom: 5px;
  color:inherit;
}

.info-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.bio-section, .privacy-section, .account-section {
  margin-bottom: 30px;
}

.bio-section textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.privacy-item {
  margin-bottom: 10px;
}

.change-password-btn {
  background-color: #2196F3;
  /* color: white; */
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.actions {
  text-align: center;
}

.save-btn {
  background-color: #4CAF50;
  /* color: white; */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn:hover
, .change-avatar-btn:hover, .change-password-btn:hover {
  opacity: 0.8;
}
@media screen and (max-width: 490px){
  .avatar-container{
    flex: 0 0 100px;
    text-align: center;
  }
  .avatar{
    width: 80px;
    height: 80px;
    margin-left: -10px;
  }
  .change-avatar-btn{
    margin-left: -17px;
  }
}
</style>import { map } from 'core-js/core/array'import { deleteProperty } from 'core-js/fn/reflect'import { check } from 'prettier'import { check } from 'prettier'
