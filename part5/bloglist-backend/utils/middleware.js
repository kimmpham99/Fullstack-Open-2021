const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {

  //get token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {

  if (request.token) {
    //get user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      //return response.status(401).json({ error: 'token missing or invalid' })
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}