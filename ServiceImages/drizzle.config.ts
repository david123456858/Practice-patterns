
import { defineConfig } from 'drizzle-kit'
import * as dotenv from "dotenv";
dotenv.config({ path: "/vault/secrets/images.env" });

export default defineConfig({
  out: './drizzle',
  schema: './src/domain/schemas/images.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
