import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from '~/tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
]

const repositoryUrl = 'https://github.com/jkomyno/remix-vite-cloudflare-pages'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Type"
          content="text/html;charset=utf-8"
        />

        {/* All meta exports on all routes will go here */}
        <Meta />

        {/* All link exports on all routes will go here */}
        <Links />
      </head>
      <body className="bg-sapphire-400">
        <div className="h-lvh flex flex-col justify-between">
          <main className="lg:px-24 sm:p-12 p-2 flex-grow">
            {children}
          </main>
          <footer className="lg:px-24 sm:px-12 p-2 bg-white">
            <div className="px-4 text-sm">
              Check this on <Link className="text-primary underline-offset-4 underline" to={repositoryUrl} target="_blank" rel="noreferrer">Github (@jkomyno)</Link>.
            </div>
          </footer>
        </div>

        {/* Manages scroll position for client-side transitions */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <ScrollRestoration />

        {/* Script tags go here */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
