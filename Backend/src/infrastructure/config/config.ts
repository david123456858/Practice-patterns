/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { config } from 'dotenv'
import { Router } from 'express'

config()

export default {
  port: process.env.PORT ?? '3000',
  routeBase: '/api/v1',
  route: Router()
}
