import { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

export const validateDto = (classDto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const classIntanceBody = plainToInstance(classDto, req.body)
    const errorValidateClass = await validate(classIntanceBody)
    console.log('errorValidateClass', errorValidateClass)

    if (errorValidateClass.length > 0) {
      res.status(422).json({
        error: 'Inprocessible entity',
        info: errorValidateClass[0].constraints
      })
      return
    }
    req.body = classIntanceBody
    next()
  }
}
