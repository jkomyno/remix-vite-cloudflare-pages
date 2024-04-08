import { getPlatformProxy } from 'wrangler'
import { getPrisma } from '~/lib/prisma.server'

async function main() {
  const { env, dispose } = await getPlatformProxy<Env>()
  const prisma = getPrisma(env)

  try {
    await prisma.survey.deleteMany()
    await prisma.database.deleteMany()
    await createDatabases(prisma)
  } finally {
    await dispose()
  }
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
