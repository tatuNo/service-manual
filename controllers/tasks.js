const tasksRouter = require('express').Router()
const Task = require('../models/task')
const Device = require ('../models/device')
const qs = require('qs')


// get tasks, filters in query parameters
tasksRouter.get('/', async (request, response) => {
  let filters = qs.parse(request.query, { allowDots: true })

  if(filters.device) {
    const match = await Device.find(filters.device)
    filters = {
      ...filters,
      device: match.map(match => match.id)
    }
  }

  const tasks = await Task.find(filters)
    .sort({ criticalness: -1, date: -1 })
    .populate('device', { name: 1, year: 1, type: 1 })

  response.json(tasks.map(task => task.toJSON()))
})

// get task
tasksRouter.get('/:id', async (request, response) => {
  const task = await Task.findById(request.params.id).populate('device', { name: 1, year: 1, type: 1 })
  task ? response.json(task.toJSON()) : response.status(404).json({ error: 'Task not found'})
})

// add new task
tasksRouter.post('/', async (request, response) => {
  const body = request.body
  const device = await Device.findById(body.device)
  
  if(!device) {
    response.status(404).json({ error: 'Device not found'})
  }

  const newTask = new Task ({
    device: device._id, 
    criticalness: body.criticalness,
    description: body.description,
    ready: body.ready,
  })

  const savedTask = await newTask.save()
  device.tasks = device.tasks.concat(savedTask._id)
  await device.save()
  response.status(201).json(savedTask.toJSON())
})

// update task
tasksRouter.put('/:id', async (request, response) => {
  const body = request.body

  const task = {
    criticalness: body.criticalness,
    description: body.description,
    date: new Date(),
    ready: body.ready,
  }

  const updatedTask = await Task.findByIdAndUpdate(request.params.id,
    task, { new: true, runValidators: true, context: 'query' })
      .populate('device', { name: 1, year: 1, type: 1 })

  updatedTask ? response.json(updatedTask.toJSON()) : response.status(404).json({ error: 'Task not found'})
})

// delete task
tasksRouter.delete('/:id', async (request, response) => {
  const task = await Task.findById(request.params.id)

  if(task) {
    await Task.deleteOne(task)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'Task not found'})
  }
})

module.exports = tasksRouter