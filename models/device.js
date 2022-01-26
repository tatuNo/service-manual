const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { strictQuery: false })

deviceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Device', deviceSchema)