/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { config } from 'dotenv'
import { Router } from 'express'

config()

export const route = Router()
export default {
  port: parseInt(process.env.PORT!) ?? 3001,
  routeBase: '/api/v1'
}
