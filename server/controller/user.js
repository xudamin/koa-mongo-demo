const User = require('../db.js').User

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

const sha1 = require('sha1')
const createToken = require('../token/createToken.js')

// 根据用户名查找
const _findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, docs) => {
      if (err) {
        reject(err)
      }
      resolve(docs)
    })
  })
}
// 找到所有用户
const _findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, docs) => {
      if (err) {
        reject(err)
      }
      resolve(docs)
    })
  })
}
// 删除某个用户
const _delUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({
      _id: id
    }, (err) => {
      if (err) {
        reject(err)
      }
      console.log('删除用户成功')
      resolve()
    })
  })
}
// 登陆
const login = async (ctx) => {
  let username = ctx.request.body.username
  let password = sha1(ctx.requesr.body.password)
  let docs = await _findUser(username)
  if (!docs) {
    console.log('用户名填写错误')
    ctx.status = 200
    ctx.body = {
      info: false
    }
  } else if (docs.password === password) {
    console.log('登陆成功')
    let token = createToken(username)
    console.log(token)
    docs.token = token
    await new Promise((resolve, reject) => {
      docs.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token,
      create_time: docs.create_time
    }
  } else {
    console.log('密码填写错误！')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  }
}
// 注册
const reg = async (ctx) => {
  console.log('~~~~~')
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username)
  })
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')

  let docs = await _findUser(user.username)
  if (docs) {
    console.log('用户名已存在')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    console.log('注册成功')
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }
}
// 获取所有的用户信息
const getAllUsers = async (ctx) => {
  let docs = await _findAllUsers()
  ctx.status = 200
  ctx.body = {
    success: true,
    result: docs
  }
}
// 删除用户
const delUser = async (ctx) => {
  let id = ctx.request.body.id
  await _delUser(id)
  ctx.status = 200
  ctx.body = {
    success: true
  }
}
module.exports = {
  login,
  reg,
  getAllUsers,
  delUser
}
