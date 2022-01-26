const config = require ('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const devicesRouter = require('./controllers/devices')
const tasksRouter = require('./controllers/tasks')

const middleware = require('./utils/middleware')
const logger = require ('./utils/logger')
const mongoose = require ('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  logger.info('connected to mongoDB')
})
.catch((error) => {
  logger.error('error conncetion to mongoDB', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/devices', devicesRouter)
app.use('/api/tasks', tasksRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app