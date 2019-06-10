const jwt = require('jsonwebtoken')
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }
  const token = authorization.split(' ')[1]
  let tokenContent = null
  try {
    tokenContent = await jwt.verify(token, 'yuxiaomin')
    console.log(tokenContent)
  } catch (err) {
    ctx.throw(401, 'invalid token')
  }
  await next()
}
