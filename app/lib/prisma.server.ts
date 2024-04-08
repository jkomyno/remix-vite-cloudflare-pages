import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

type Env = {
  D1_DATABASE: D1Database
}

export function getPrisma(env: Env) {
  const adapter = new PrismaD1(env.D1_DATABASE)
  const prisma = new PrismaClient({ adapter })

  return prisma
}
