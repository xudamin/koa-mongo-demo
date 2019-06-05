<template>
  <div>
    <input type="text" v-model="form.username">
    <input type="password" v-model="form.password">
    <button @click="handleRegister">注册</button>
    <button @click="handleSubmit">登录</button>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleSubmit() {
      console.log(this.form)
      this.$router.push('hello')
    },
    handleRegister() {
      this.$router.push('register')
    }
  }
}
</script>

