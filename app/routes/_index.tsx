import { useRef } from 'react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useFetcher } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { useTypedLoaderData } from '~/hooks'
import { getPrisma } from '~/lib/prisma.server'

export const meta = () => {
  return [{ title: 'Prisma Driver Adapters - QA' }]
}

// The `loader` function block runs on the server and client.
// You can use it to fetch data on the server before the page is rendered.
export async function loader({ context }: LoaderFunctionArgs) {
  const prisma = getPrisma(context.cloudflare.env)

  const choices = await prisma.database.findMany({
    orderBy: {
      id: 'asc',
    },
  })

  const submissions = await prisma.survey.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      database: true,
      createdAt: true,
    }
  })
  
  return { choices, submissions }
}

// The `action` function responds to form submissions.
export async function action({ context, request, response }: ActionFunctionArgs) {
  const formData = await request.formData()
  const databaseValue = String(formData.get('database') || '')

  try {
    const prisma = getPrisma(context.cloudflare.env)
    const { database } = await prisma.survey.create({
      data: {
        database: {
          connect: {
            value: databaseValue,
          },
        },
      },
      select: {
        database: true,
      }
    })

    return { ok: true, errors: null, data: database } as const
  } catch (_) {
    const dbError = `We're currently having issues connecting to our database. Please try again later.`

    if (response) {
      response.status = 500
    }

    throw new Response(dbError, { status: 500 })
  }
}

export default function Survey({ children: errorBoundary }: { children: React.ReactNode}) {
  const dateFormatter = new Intl.DateTimeFormat('en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }
  )
  const { choices, submissions } = useTypedLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()
  const actionResult = fetcher.data
  console.log('actionResult', actionResult)

  const isSubmitting = fetcher.state === 'submitting'
    && fetcher.formData?.get('_action') === 'submit'

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="bg-white h-full max-h-screen rounded-md shadow-md flex items-center justify-center relative">
      <div className="flex flex-1 h-full flex-col flex-wrap items-center justify-between mx-auto p-4">
        <div className="h-full sm:mx-auto sm:w-full sm:max-w-[480px] mt-4">
          <fetcher.Form
            ref={formRef}
            className="space-y-6"
            method="post"
          >
            <h2 className="text-xl text-bold text-center drop-shadow-sm">
              What is your favourite Database?
            </h2>
            <ul className="grid w-full gap-2 md:grid-cols-2">
              {
                choices.map(({ label, value }) => (
                  <li key={`key-${value}`}>
                    <input type="radio" id={`radio-${value}`} name="database" value={value} className="hidden peer" />
                    <label htmlFor={`radio-${value}`} className="inline-flex items-center justify-between gap-2 w-full p-4 text-gray-500 bg-white border border-gray-200 cursor-pointer peer-checked:border-sapphire-500 peer-checked:text-sapphire-500 rounded-md shadow-sm">
                      <div className="block w-full text-lg font-semibold text-center">{label}</div>
                    </label>
                  </li>
                ))
              }
            </ul>

            <Button
              disabled={isSubmitting}
              type="submit"
              size="lg"
              name="_action"
              value="submit"
              className="w-full"
            >
              {'Submit'}
            </Button>

            <div className="w-full">
              {''}
              {errorBoundary}
            </div>
          </fetcher.Form>
        </div>
      </div>
      <div className="flex flex-1 h-full flex-col flex-wrap items-center justify-between mx-auto p-4">
        <div className="h-full overflow-y-hidden sm:mx-auto sm:w-full sm:max-w-[480px] mt-4">
          <h2 className="text-xl text-bold text-center drop-shadow-sm">Submissions</h2>
          <div className="mt-4 max-h-96 overflow-y-auto">
            <ul className="flex flex-col gap-2 mt-2">
              {
                submissions.map((submission, index) => (
                  <li key={`submission-${index}`} className="flex items-center justify-between w-full p-4 text-gray-500 bg-white border border-gray-200 rounded-md shadow-sm">
                    <span>{submission.database.label}</span>
                    <span>{dateFormatter.format(submission.createdAt)}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log('within ErrorBoundary', error)
  return (
    <>
      {/* TODO: render our chat component with the error message */}
      <Survey>
        <div className="bg-white h-full max-h-screen rounded-md shadow-md flex items-center justify-center relative">
          <div className="flex flex-1 h-full flex-col flex-wrap items-center justify-between mx-auto p-4">
            <div className="h-full sm:mx-auto sm:w-full sm:max-w-[480px] mt-4">
              <h2 className="text-xl text-bold text-center drop-shadow-sm">
                ERROR TITLE
              </h2>
              <div className="mt-4">
                <p className="text-center">ERROR DETAILS</p>
              </div>
            </div>
          </div>
        </div>
      </Survey>
    </>
  );
}
