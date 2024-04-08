import { getPrisma } from '~/lib/prisma.server'

type Env = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

async function main() {
  const prisma = getPrisma(process.env as Env)

  await prisma.survey.deleteMany()
  await prisma.database.deleteMany()
  await createDatabases(prisma)
}

main()

async function createDatabases(prisma: ReturnType<typeof getPrisma>) {
  const databases = [
    {
      label: 'PostgreSQL',
      value: 'postgres',
    },
    {
      label: 'Cloudflare D1',
      value: 'cloudflare-d1',
    },
    {
      label: 'Turso (LibSQL)',
      value: 'libsql',
    },
    {
      label: 'Neon',
      value: 'neon',
    },
  ]

  // SQLite doesn't support `createMany` yet.
  await prisma.$transaction(
    databases.map((database) =>
      prisma.database.create({
        data: database,
      })
    )
  )
}
