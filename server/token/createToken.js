const jwt = require('jsonwebtoken')
module.exports = function(user_id) {
  // 把用户名作为JWT Payload的一个属性，并且把密钥设置为‘zhangzhongjie',token过期时间设置为60s。意思是登录之后，60s内刷新页面不需要再重新登录。
  const token = jwt.sign({
      user_id: userid
    },
    'yuxiaomin', {
      expiresIn: '60s'
    })
  return token
}
