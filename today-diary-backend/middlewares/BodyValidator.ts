import {Request, Response, NextFunction} from "express";
import {ClassConstructor, plainToInstance} from "class-transformer";
import {validate} from "class-validator";


const bodyValidator = (dto: ClassConstructor<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body)
    const errors = await validate(dtoObj)
    if (errors.length === 0) {
      next()
    } else {
      const messages = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints
        }
      })
      res.status(400).json({messages})
    }
  }
}

export default bodyValidator
