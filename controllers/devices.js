const devicesRouter = require('express').Router()
const Device = require('../models/device')

// get devices
devicesRouter.get('/', async (request, response) => {
  const devices = await Device.find({}).populate('tasks',{ description: 1, criticalness: 1, ready: 1, date: 1})
  response.json(devices.map(device => device.toJSON()))
})

// add new device
devicesRouter.post('/', async (request, response) => {
  const body = request.body

  const device = new Device ({
    name: body.name,
    year: body.year,
    type: body.type
  })

  const savedDevice = await device.save()
  response.json(savedDevice.toJSON())
})

// get device by id
devicesRouter.get('/:id', async (request, response) => {
  const device = await Device.findById(request.params.id).populate('tasks', { description: 1, criticalness: 1, ready: 1, date: 1 })
  device ? response.json(device.toJSON()) : response.status(404).json({ error: 'Device not found'})
})

module.exports = devicesRouter