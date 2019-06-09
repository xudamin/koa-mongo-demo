const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/vue-login')

let db = mongoose.connection
mongoose.Promise = global.Promise

db.on('error', function() {
  console.log('数据库连接失败！')
})
db.on('open', function() {
  console.log('数据库连接成功')
})

// Schema定义表的模板，让这一类document在数据库中有一个具体的构成、存储模式
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date
})

const User = mongoose.model('User', userSchema)
module.exports = User
