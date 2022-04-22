import {Schema, model} from "mongoose";

const diarySchema = new Schema({
  diaryId: {type: String, required: true},
  author: {type: String, required: true},
  date: {type: String, required: true},
  content: {type: String, required: true},
  mood: {type: String, required: true},
  isPublic: {type: Boolean, required: true},
})

const diaryModel = model('diaries', diarySchema)

export default diaryModel
