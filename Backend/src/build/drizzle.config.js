'use strict'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const drizzle_kit_1 = require('drizzle-kit')
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config({ path: '/vault/secrets/config.env' })
exports.default = (0, drizzle_kit_1.defineConfig)({
  out: './drizzle',
  schema: './build/src/infrastructure/database/Schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
})
