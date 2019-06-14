const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const UserController = require('./server/controller/user.js')

const checkToken = require('./server/token/checkToken.js')

// const loginRouter = new Router()
// loginRouter.post('/login', UserController.login)

// const registerRouter = new Router()
// registerRouter.post('/register', UserController.reg)

// const userRouter = new Router()
// userRouter.get('/user', checkToken, UserController.getAllUsers)
// //删除某个用户
// const delUserRouter = new Router()
// delUserRouter.post('/delUser', checkToken, UserController.delUser)
// console.log(registerRouter)
// //装载上面四个子路由
// router.use('/api', loginRouter.routes(), loginRouter.allowedMethods())
// router.use('/api', registerRouter.routes(), registerRouter.allowedMethods())
// router.use('/api', userRouter.routes(), userRouter.allowedMethods())
// router.use('/api', delUserRouter.routes(), delUserRouter.allowedMethods())

router.post('/api/login', UserController.login)
router.post('/api/register', UserController.reg)
router.get('/api/users', checkToken, UserController.getAllUsers)
router.post('/api/delUser', checkToken, UserController.delUser)

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  console.log('The server is running at http://localhost:' + 3001)
})
