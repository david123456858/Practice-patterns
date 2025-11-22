/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { defineConfig } from 'drizzle-kit'
import dotenv from "dotenv";
dotenv.config({ path: "/vault/secrets/config.env" });

export default defineConfig({
  out: './drizzle',
  schema: './src/infrastructure/database/Schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
