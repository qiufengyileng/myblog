<template>
  <div>
    <Header style="height:10vh"></Header>
  <div class="personal-center" style="padding-top: 10vh;">
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
        <textarea v-model="user.introduction" rows="4" style="min-width: 100%;max-width: 100%;"></textarea>
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
        <button @click="changePasswordDialog = true" class="change-password-btn">修改密码</button>
      </div>
      <div class="actions">
        <button @click="saveChanges" class="save-btn">保存更改</button>
      </div>
    </div>
  
  </div>
  <!-- 更改头像弹框 -->
  <el-dialog title="更改头像" :visible.sync="dialogVisible" 
  center
  width="30%">
    <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/user/uploadAvatar"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="_avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  <div id="buttons" style='padding-top: 1rem;' @click.stop>
<el-button type="primary" @click="chooseAvatar" >选定</el-button>
<el-button  @click="cancel">取消</el-button>
</div>
</el-upload>
  </el-dialog>
  <!-- 修改密码弹框 -->
  <el-dialog title="修改密码" :visible.sync="changePasswordDialog" 
  :close-on-click-modal="false"
  center
  width="30%">
  <el-form :model="form" :rules="rules" ref="form" status-icon>
    <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" :type="showPasswordFrom.oldPassword ? 'text' : 'password'" placeholder="请输入旧密码">
      <template #append>
        <i :class="showPasswordFrom.oldPassword ? 'el-icon-view' : 'el-icon-lock'" 
        @click="showPasswordFrom.oldPassword = !showPasswordFrom.oldPassword"></i>
      </template>
    </el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="form.newPassword" :type="showPasswordFrom.newPassword ? 'text' : 'password'" placeholder="请输入新密码">
      <template #append>
        <i :class="showPasswordFrom.newPassword ? 'el-icon-view' : 'el-icon-lock'" 
        @click="showPasswordFrom.newPassword = !showPasswordFrom.newPassword"></i>
      </template>
    </el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
    <el-input v-model="form.confirmPassword" :type="showPasswordFrom.confirmPassword ? 'text' : 'password'" placeholder="请确认新密码">
      <template #append>
        <i :class="showPasswordFrom.confirmPassword ? 'el-icon-view' : 'el-icon-lock'" 
        @click="showPasswordFrom.confirmPassword = !showPasswordFrom.confirmPassword"></i>
      </template>
    </el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('form')">提交</el-button>
    <el-button @click="unsubmit('form')">取消</el-button>
  </el-form>
  </el-dialog>
</div>
</template>

<script>
import Header from '@/components/header.vue'
import { mapState } from 'vuex'
import { uploadAvatar, changePassword } from '@/api/user'

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
      chageData: null,
      dialogVisible: false,
      imageUrl: '',
      changePasswordDialog: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showPasswordFrom: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
      },
      rules: {
        oldPassword: [{ required: true, validator: this.validateOldPassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: this.validateNewPassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: this.validateConfirmPassword, trigger: 'blur' }]
      }
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
      this.dialogVisible = true
    },
    saveChanges () {
      this.$store.dispatch('user/fetchSaveUserData', this.chageData)
    },
    handleAvatarSuccess (res, file) {
      // 要上传的文件 
      this.uploadedFile = file.raw
      // 预览的图片
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 选定头像
    async chooseAvatar () {
      try {
      // 创建 FormData 对象来发送文件
        const formData = new FormData()
        formData.append('avatar', this.uploadedFile)

        // 发送请求到后端
        const response = await uploadAvatar(formData)

        if (response.success) {
        // 更新本地头像URL
          this.$store.commit('user/setUserAvatar', response.avatarUrl)
          this.$message.success('头像更新成功')
        } else {
          this.$message.error('头像更新失败')
        }
      } catch (error) {
        console.error('上传头像失败:', error)
        this.$message.error('上传失败，请重试')
      } finally {
        this.dialogVisible = false
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 取消
    cancel () {
      this.imageUrl = ''
      this.dialogVisible = false
    },
    // 选定
    save () {
      this.dialogVisible = false
    },
    // 验证旧密码
    validateOldPassword (rule, value, callback) {
      const reg = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (!reg.test(value)) {
        return callback(new Error('密码应为字母和数字的组合'))
      }
      callback()
    },
    // 验证新密码
    validateNewPassword (rule, value, callback) {
      const reg = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (value === this.form.oldPassword) {
        return callback(new Error('新密码不能与旧密码相同'))
      }
      if (!reg.test(value)) {
        return callback(new Error('密码应为字母和数字的组合'))
      }
      callback()
    },
    // 验证确认密码
    validateConfirmPassword (rule, value, callback) {
      if (value !== this.form.newPassword) {
        return callback(new Error('两次密码不一致'))
      }
      callback()
    },
    // 取消
    unsubmit (formName) {
      // 是 Element UI 表单组件中的一个方法，用于重置表单数据
      this.$refs[formName].resetFields()
      this.changePasswordDialog = false
    },
    // 提交验证
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const result = await changePassword(this.form.oldPassword, this.form.newPassword)
            if (result.message === 'success') {
              this.$message.success('修改密码成功')
              //  更新本地数据
              this.$store.commit('user/setUserPassword', this.form.newPassword)
            } else {
              this.$message.error(result.message)
            }
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.changePasswordDialog = false
          }
        } else {
          this.$message.error('请填写完整信息')
        }
      })
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border-radius: 1rem;
    border: 1px dotted #d9d9d9;
    line-height: 178px;
    text-align: center;
  }
  ._avatar {
    width: 200px;
    max-height: 400px;
    object-fit: cover;
    display: block;
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
