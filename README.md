# Remix (Vite) + Cloudflare Pages + Prisma

This is an example backend application built to demonstrate how to use the `driverAdapters` feature of Prisma at the Edge.
The app retrieves a list of entries from a database and returns them as a JSON response.

## Getting Started

Each branch of this repository showcases a different Prisma Driver Adapter.
- The `main` branch doesn't use Prisma at all, it just saves data in memory. It's the starting point of every branch.
- [`feat/libsql`](https://github.com/jkomyno/remix-vite-cloudflare-pages/tree/feat/libsql) uses the `@prisma/adapter-libsql` driver adapter with `@libsql/client`.
- [`feat/d1`](https://github.com/jkomyno/remix-vite-cloudflare-pages/tree/feat/d1) uses the `@prisma/adapter-d1` driver adapter with Cloudflare D1.

## Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
