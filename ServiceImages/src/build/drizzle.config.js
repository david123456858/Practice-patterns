'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const drizzle_kit_1 = require('drizzle-kit')
const dotenv = require('dotenv')
dotenv.config({ path: '/vault/secrets/images.env' })
exports.default = (0, drizzle_kit_1.defineConfig)({
  out: './drizzle',
  schema: './build/domain/schemas/images.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
})
