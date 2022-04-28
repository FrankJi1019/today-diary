import {Router, Request, Response} from "express";
import futureLetterModel from "../../models/FutureLetter";
import bodyValidator from "../../middlewares/BodyValidator";
import FutureLetterCreationDTO from "../../dto/FutureLetterCreationDTO";

const futureLetterRouter = Router({mergeParams: true})

futureLetterRouter.post(
  '/',
  [bodyValidator(FutureLetterCreationDTO)],
  async (req: Request, res: Response) => {
    const body = req.body
    const sameDayLetter = await futureLetterModel.find({
      author: body.author,
      fromDate: body.fromDate,
    })
    const letterId = `${body.author}-${body.toDate}-${sameDayLetter.length}`
    const read = false
    const futureLetter = await new futureLetterModel({
      ...body, letterId, read
    }).save()
    res.json(futureLetter)
  }
)

futureLetterRouter.get('/', async (req: Request, res: Response) => {
  const filter = req.query.filter
  const author = req.params.userId
  if (!filter) {
    const allLetters = await futureLetterModel.find({author})
    res.json(allLetters)
  } else {
    const letters = (await futureLetterModel.find({read: filter === 'read'})).filter(letter => {
      const toDate = new Date(letter.toDate)
      return +toDate < +new Date()
    })
    res.json(letters)
  }
})

futureLetterRouter.patch('/:letterId/read', async (req: Request, res: Response) => {
  const letterId = req.params.letterId
  const isExist = await futureLetterModel.exists({letterId})
  if (isExist) {
    const result = await futureLetterModel.findOneAndUpdate({letterId}, {read: true}, {new: true})
    res.json(result)
  } else {
    res.status(404).json({message: 'Letter not found'})
  }
})

futureLetterRouter.get('/unread-count', async (req: Request, res: Response) => {
  const author = req.params.userId
  const allUnread = (await futureLetterModel.find({author, read: false})).filter(letter => {
    const toDate = new Date(letter.toDate)
    return +toDate < +new Date()
  })
  res.json(allUnread.length)
})

futureLetterRouter.get('/:letterId', async (req: Request, res: Response) => {
  const letterId = req.params.letterId
  const letter = await futureLetterModel.findOne({letterId})
  if (letter) res.json(letter)
  else res.status(404).json({message: 'Letter not found'})
})

export default futureLetterRouter
