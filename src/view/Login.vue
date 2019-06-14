<template>
  <div>
    <h1>登录</h1>
    <input type="text" v-model="form.username">
    <input type="password" v-model="form.password">
    <button @click="handleRegister">注册</button>
    <button @click="handleSubmit">登录</button>
  </div>
</template>
<script>
import axios from '../axios.js'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleSubmit () {
      axios.userLogin(this.form).then(({ data }) => {
        if (data.success === false) {
          alert('账号不存在')
        }
        if (data.success) {
          alert('登陆成功')
          let token = data.token
          let username = data.username
          this.$store.dispatch('UserLogin', token)
          this.$store.dispatch('UserName', username)
          this.$router.push('hello')
        } else {
          alert('密码错误')
        }
      })
    },
    handleRegister () {
      this.$router.push('register')
    }
  }
}
</script>
