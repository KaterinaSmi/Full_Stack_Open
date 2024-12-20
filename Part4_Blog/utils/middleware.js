
const logger = require('./logger')

const requestLogger  = (request, response, next) => {
  logger.info('Method: ',request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '').trim() // Ensure trimming
    request.token = token  // Ensure trimming
  }
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error : 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  logger.error('Error message:', error.message)

  if(error.name === 'CastEror') {
    return response.statis(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === ' TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}