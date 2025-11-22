import { defineConfig } from '@prisma/client'

export default defineConfig({
  adapter: process.env.DIRECT_URL!,
  migrateUrl: process.env.DATABASE_URL!,
})
