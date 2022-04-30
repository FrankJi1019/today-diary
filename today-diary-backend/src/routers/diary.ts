import {Router, Request, Response} from "express";
import diaryModel from "../../models/Diary";
import bodyValidator from "../../middlewares/BodyValidator";
import DiaryCreationDTO from "../../dto/DiaryCreationDTO";

const FORCE_WAIT = 1000

const diaryRouter = Router({mergeParams: true})

diaryRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await new Promise(r => setTimeout(r, FORCE_WAIT));
    const author = req.params['userId']
    const allDiaries = await diaryModel.find({author})
    allDiaries.sort((a, b) => b.date.localeCompare(a.date))
    res.json(allDiaries)
  }
)

diaryRouter.post(
  '/',
  [bodyValidator(DiaryCreationDTO)],
  async (req: Request, res: Response) => {
    await new Promise(r => setTimeout(r, FORCE_WAIT));
    const diary = req.body
    const diaryId = diary.author + '-' + diary.date
    const diariesWithId = await diaryModel.find({diaryId})
    if (diariesWithId.length !== 0) {
      const result = await diaryModel.findOneAndUpdate({diaryId}, {...diary}, {new: true})
      res.status(200).json({...result._doc})
    }
    else {
      const result = await new diaryModel({...diary, diaryId}).save()
      res.status(201).json({...result._doc})
    }
  }
)

diaryRouter.get(
  '/public',
  async (req: Request, res: Response) => {
    await new Promise(r => setTimeout(r, FORCE_WAIT));
    const publicDiaries = await diaryModel.find({isPublic: true})
    publicDiaries.sort((a, b) => b.date.localeCompare(a.date))
    res.json(publicDiaries)
  }
)

diaryRouter.get(
  '/:diaryId',
  async (req: Request, res: Response) => {
    await new Promise(r => setTimeout(r, FORCE_WAIT));
    const diaryId = req.params['diaryId']
    const author = req.params['userId']
    const diary = await diaryModel.findOne({diaryId, author})
    if (diary) {
      res.json(diary)
    } else {
      res.status(404).json({message: "Diary not found"})
    }
  }
)

export default diaryRouter
