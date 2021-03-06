const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  criticalness: { type: Number, required: true },
  ready: { type: Boolean, required: true },
}, { strictQuery: false })

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)