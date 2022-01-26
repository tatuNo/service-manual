const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Device = require('../models/device')
const Task = require('../models/task')
const helper = require('./test_helper')

// few tests mainly for filter testing

beforeEach(async () => {
  await api.post('/api/testing/reset')
  await helper.initDb()
})

test('tasks are returned as json', async () => {
  await api
    .get('/api/tasks')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all tasks are returned', async () => {
  const response = await api.get('/api/tasks')
  expect(response.body.length).toBe(helper.initialTasks.length)
})

test('tasks are returned in correct order', async () => {
  const response = await api.get('/api/tasks')
  const expected = helper.orderTasks(response.body)

  expect(response.body).toEqual(expected)
})

test('when incorrect filter return empty array', async () => {
  const responseA = await api.get('/api/tasks?device.color=brown')
  expect(responseA.body).toEqual([])

  const responseB = await api.get('/api/tasks?color=brown')
  expect(responseB.body).toEqual([])
})

test('tasks are filtered using device year', async () => {
  const year = 2012
  const response = await api.get(`/api/tasks?device.year=${year}`)
  const result = response.body.every(task => task.device.year === year)
  
  expect(result).toBe(true)
})

test('tasks are filtered using device type', async () => {
  const type = 'Type 14'

  const response = await api.get(`/api/tasks?device.type=${type}`)
  const result = response.body.every(task => task.device.type === type)

  expect(result).toBe(true)
})

test('tasks are filtered using device type and device year', async () => {
  const type = 'Type 14'
  const year = 2013

  const response = await api.get(`/api/tasks?device.type=${type}&device.year=${year}`)
  const result = response.body.every(task => task.device.type === type && task.device.year === year)

  expect(result).toBe(true)
})

test('tasks are filtered with task value ready', async () => {
  const response = await api.get(`/api/tasks?ready=false`)
  const result = response.body.every(task => task.ready === false)

  expect(result).toBe(true)
})

test('task are filtered using task value ready and device year', async () => {
  const year = 2018
  const response = await api.get(`/api/tasks?ready=true&device.year${year}`)

  const result = response.body.every(task => task.ready === true && task.device.year === year)

  expect(result).toBe(true)
})

afterAll(() => {
  mongoose.connection.close()
})