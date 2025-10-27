/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { config } from 'dotenv'
import { Router } from 'express'

config()

export const route = Router()
export default {
<<<<<<< HEAD
  port: parseInt(process.env.PORT!) ?? 3001,
=======
  port: process.env.PORT ?? '3001',
>>>>>>> eee1dc14a35291af96f14bfac4512f9b5d5520c7
  routeBase: '/api/v1'
}
