// Prisma 7 configuration
// Connection URLs are now defined here instead of schema.prisma

export default {
  datasource: {
    url: process.env.DATABASE_URL!,
    directUrl: process.env.DIRECT_URL,
  },
}
