const User = require('../db.js').User

const moment = require('moment')
const objectIdToTimeStamp = require('objectid-to-timestamp')

const sha1 = require('sha1')
const createToken = require('../token/createToken.js')

// 根据用户名查找
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username
    }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 找到所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 删除某个用户
const delUser = (id) => {
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
  let doc = await fincUser(username)
  if (!doc) {
    console.log('用户名填写错误')
    ctx.status = 200
    ctx.body = {
      info: false
    }
  } else if (doc.password === password) {
    console.log('登陆成功')
    let token = createToken(username)
    console.log(token)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
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
      create_time: doc.create_time
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
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username),
    create_time: moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
  })
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')

  let doc = await findUser(user.username)
  if (doc) {
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
  let doc = await findAllUsers()
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}
// 删除用户
const delUser = async (ctx) => {
  let id = ctx.request.body.id
  await delUser(id)
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
