import { NextFunction, Request, Response } from 'express'

export class UserController {
  private readonly userService: any

  constructor (userService: any) {
    this.userService = userService
  }

  public createUser (req: Request, res: Response, next: NextFunction): void {

  }

  public getUsers (req: Request, res: Response, next: NextFunction): void {

  }

  public getUsersId (req: Request, res: Response, next: NextFunction): void {

  }
}
