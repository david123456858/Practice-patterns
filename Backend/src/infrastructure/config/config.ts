/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { config } from 'dotenv'
import { Router } from 'express'

config()

export const route = Router()
export default {
  port: process.env.PORT ?? '3000',
  routeBase: '/api/v1'
}
