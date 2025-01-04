<template>
  <div>
   <el-dialog :visible="visible"
    title="登录"
    width="30%"
    :before-close="handleClose"
    :append-to-body="true">
<el-form :model="form"
 v-loading="loading"
 ref="loginForm"
 element-loading-text="登录中..."
:rules="formRules" status-icon>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名" />
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" placeholder="请输入密码" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleLogin" :disabled="buttonDisabled">登录</el-button>
  </el-form-item>
</el-form>
   </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { checkIdentity } from '@/api/identity'
export default {
  name: 'LoginComponent',
  data () {
    // 自定义验证用户名
    const validateUsername = (rule, value, callback) => {
      console.log(rule, value)
      const reg = /^[\u4e00-\u9fa5]{0,10}$/
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      if (!reg.test(value)) {
        return callback(new Error('中文昵称长度不超过10个字'))
      }
      callback()
    }
    // 自定义验证密码
    const validatePass = (rule, value, callback) => {
      const reg = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (!reg.test(value)) {
        return callback(new Error('密码应为字母和数字的组合'))
      }
      callback()
    }
    return {
      loading: false,
      buttonDisabled: false,
      form: {
        username: '秋风易冷',
        password: 'wwww2003'
      },
      formRules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('login', ['visible'])
  },
  watch: {
    visible (newVal) {
      // 监听visible的变化，如果为true，则禁止滚动
      if (newVal) {
        this.preventScroll()
      } else {
        // 如果为false，则开启滚动
        this.allowScroll()
      }
    }
  },
  methods: {
    // 禁止滚动
    preventScroll () {
      // 通过设置 body 样式来阻止滚动
      document.querySelector('html').style.overflowY = 'hidden'
      document.querySelector('html').style.paddingRight = '17px' // 防止滚动条消失导致页面抖动
    },
    // 开启滚动
    allowScroll () {
      document.querySelector('html').style.overflowY = 'scroll'
    },
    handleClose () {
      this.$store.commit('login/setVisible', false)
    },
    // 登录前验证
    validateLogin () {
      return new Promise((resolve, reject) => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            resolve(true)
          } else {
            console.log('error submit!!')
            reject(new Error('请填写用户名和密码'))
          }
        })
      })
    },
    async handleLogin () {
      // 验证一遍用户名和密码是否填写并且符合格式
      try {
        await this.validateLogin()
      } catch (error) {
        this.$message.warning(error.message)
        return
      }
      // 禁用按钮
      this.buttonDisabled = true
      // 显示加载中
      this.loading = true
      // 登入接口调用
      try {
        const indentity = await checkIdentity(this.form.username, this.form.password)
        console.log('indentity', indentity)
        if (indentity) {
          this.$message.success('登录成功')
          this.$store.commit('login/setVisible', false)
          // 刷新页面
          this.$router.go(0)
        } else {
          this.$message.error('登录失败')
        }
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.buttonDisabled = false
        this.loading = false
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.$store.commit('login/setVisible', true)
    // }, 2000)
  }
}
</script>
<style lang="scss" scoped>

</style>
