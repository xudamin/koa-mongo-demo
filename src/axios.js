import axios from 'axios'
import store from './store'
import router from './router'

let instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${token.state.token}`
    }
    return config
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({ //跳转到登录页面
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(error.response)
  }
)

export default {
  //用户注册
  userRegister(data) {
    return instance.post('/api/register', data);
  },
  //用户登录
  userLogin(data) {
    return instance.post('/api/login', data);
  },
  //获取用户
  getUser() {
    return instance.get('/api/user');
  },
  //删除用户
  delUser(data) {
    return instance.post('/api/delUser', data);
  }
}
