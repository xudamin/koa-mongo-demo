const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser)

const UserController = require('./server/controller/user.js')

const checkToken = require('./server/token/checkToken.js')

const loginRouter = new Router()

loginRouter.post('/login', UserControl.Login)

const registerRouter = new Router()
registerRouter.post('/register', UserController.Reg)

const userRouter = new Router()
userRouter.get('/user', checkToken, UserController.GetAllUsers)
//删除某个用户
const delUserRouter = new Router()
delUserRouter.post('/delUser', checkToken, UserController.DelUser)

//装载上面四个子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/api', registerRouter.routes(), registerRouter.allowedMethods())
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/api', delUserRouter.routes(), delUserRouter.allowedMethods())

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
