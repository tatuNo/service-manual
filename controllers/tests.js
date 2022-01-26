const router = require('express').Router()
const Device = require ('../models/device')
const Task = require ('../models/task')

router.post('/reset', async (request, response) => {
  await Device.deleteMany({})
  await Task.deleteMany({})

  response.status(204).end()
})

module.exports = router