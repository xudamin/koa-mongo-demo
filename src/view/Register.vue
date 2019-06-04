<template>
  <div>
    <input type="text" v-model="form.username">
    <input type="password" v-model="form.password">
    <button>重置</button>
    <button @click="handleSubmit">注册</button>
  </div>
</template>
<script>
export default {
  name: 'Register',
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
    }
  }
}
</script>

