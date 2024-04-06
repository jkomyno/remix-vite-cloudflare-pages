import type { LoaderFunction, ActionFunction } from "@remix-run/cloudflare";
import {
  useLoaderData,
  useActionData,
} from "@remix-run/react";

export function useTypedLoaderData<T extends LoaderFunction>() {
  return useLoaderData() as unknown as Awaited<ReturnType<T>>;
}

export function useTypedActionData<T extends ActionFunction>() {
  return useActionData() as unknown as Awaited<ReturnType<T>> | undefined;
}
