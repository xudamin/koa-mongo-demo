<template>
  <div>
    <h1>注册</h1>
    <input type="text" v-model="form.username">
    <input type="password" v-model="form.password">
    <button>重置</button>
    <button @click="handleSubmit">注册</button>
  </div>
</template>
<script>
import axios from '../axios.js'
export default {
  name: 'Register',
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
      axios.userRegister(this.form).then(({data}) => {
        if (data.success) {
          alert('注册成功')
          this.$router.push('/login')
        } else {
          alert('用户名已存在')
        }
      })
    }
  }
}
</script>
