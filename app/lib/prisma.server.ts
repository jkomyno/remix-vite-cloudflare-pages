import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

type Env = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

export function getPrisma(env: Env) {
  const connectionString = `${env.TURSO_DATABASE_URL}`
  const token = `${env.TURSO_AUTH_TOKEN}`

  const turso = createClient({
    url: connectionString,
    authToken: token,
  })
  const adapter = new PrismaLibSQL(turso)
  const prisma = new PrismaClient({ adapter })

  return prisma
}
