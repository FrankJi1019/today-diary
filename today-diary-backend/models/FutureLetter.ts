import {Schema, model} from 'mongoose'

const futureLetterSchema = new Schema({
  letterId: {type: String, required: true},
  author: {type: String, required: true},
  fromDate: {type: String, required: true},
  toDate: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  read: {type: Boolean, required: true},
})

const futureLetterModel = model('future-letters', futureLetterSchema)

export default futureLetterModel
