import express, {Request, Response} from 'express'
import mongoose from "mongoose";
import diaryRouter from "./routers/diary";
import cors from 'cors'
import futureLetterRouter from "./routers/futureLetter";

const dbUrl = 'mongodb+srv://admin:admin@cluster0.lr9oo.mongodb.net/today-diary?retryWrites=true&w=majority'
mongoose.connect(dbUrl)

const app = express()
app.use(express.json())
app.use(cors());

app.use('/users/:userId/diaries', diaryRouter)
app.use('/users/:userId/future-letters', futureLetterRouter)

app.get('/', (req: Request, res: Response) => {
  res.json('OK')
})

app.get('/time', (req: Request, res: Response) => {
  res.json(new Date().toUTCString())
})

app.listen(4000, () => console.log('Server powered on'))

module.exports = app
