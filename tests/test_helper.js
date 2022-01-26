const Task = require('../models/task')
const Device = require ('../models/device')

const initialDevices = [
   {
    _id: "5a422a851b54a676234d17f0",
    name: "Device 0",
    year: 2011,
    type: "Type 1",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f1",
    name: "Device 1",
    year: 2012,
    type: "Type 14",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f2",
    name: "Device 2",
    year: 2009,
    type: "Type 3",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f3",
    name: "Device 3",
    year: 2010,
    type: "Type 1",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f4",
    name: "Device 4",
    year: 2009,
    type: "Type 2",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f5",
    name: "Device 5",
    year: 2017,
    type: "Type 8",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f6",
    name: "Device 6",
    year: 2012,
    type: "Type 6",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f7",
    name: "Device 7",
    year: 2018,
    type: "Type 4",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f8",
    name: "Device 8",
    year: 2009,
    type: "Type 7",
    __v: 0
   },
   {
    _id: "5a422a851b54a676234d17f9",
    name: "Device 9",
    year: 2013,
    type: "Type 14",
    __v: 0
   },
]
// Dates hard coded for testing purposes
const initialTasks = [
  {
    _id: "5a422a851b54a676234d17fa",
    date: new Date("2021-02-22T20:42:16.652Z"),
    description: "Description one",
    criticalness: 1,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f2"
    }
  },
  {
    _id: "5a422a851b54a676234d17fb",
    date: new Date("2021-02-22T19:42:16.652Z"),
    description: "Description two",
    criticalness: 1,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f1"
    }
  },
  {
    _id: "5a422a851b54a676234d17fc",
    date: new Date("2021-02-22T22:42:16.652Z"),
    description: "Description three",
    criticalness: 1,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f0"
    }
  },
  {
    _id: "5a422a851b54a676234d17fd",
    date: new Date("2021-02-21T20:42:16.652Z"),
    description: "Description four",
    criticalness: 2,
    ready: true,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f4"
    }
  },
  {
    _id: "5a422a851b54a676234d17fe",
    date: new Date("2021-02-22T20:45:16.652Z"),
    description: "Description five",
    criticalness: 2,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f3"
    }
  },
  {
    _id: "5a422a851b54a676234d17ff",
    date: new Date("2021-02-17T20:42:16.652Z"),
    description: "Description six",
    criticalness: 2,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f3"
    }
  },
  {
    _id: "5a422a851b54a676234d17f1",
    date: new Date("2020-02-17T20:42:16.652Z"),
    description: "Description seven",
    criticalness: 3,
    ready: true,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f6"
    }
  },
  {
    _id: "5a422a851b54a676234d17f2",
    date: new Date("2020-09-17T20:42:16.652Z"),
    description: "Description eight",
    criticalness: 3,
    ready: true,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f7"
    }
  },
  {
    _id: "5a422a851b54a676234d17f3",
    date: new Date("2020-09-17T20:47:16.652Z"),
    description: "Description nine",
    criticalness: 3,
    ready: false,
    __v: 0,
    device: {
      _id: "5a422a851b54a676234d17f2"
    }
  },
]

const tasksInDb = async () => {
  const tasks = await Task.find({})
  return tasks.map(task => task.toJSON())
}

const orderTasks = tasks => {
  return [...tasks].sort((a, b) => b.criticalness - a.criticalness || new Date(b.date) - new Date(a.date))
}

const initDb = async () => {
  await Device.insertMany(initialDevices)
  await Task.insertMany(initialTasks)
}

module.exports = {
  initialDevices,
  initialTasks,
  tasksInDb,
  orderTasks,
  initDb
}