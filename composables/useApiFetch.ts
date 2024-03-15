import type { UseFetchOptions } from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();

  const appURL = config.public.appURL;
  const apiURL = config.public.apiURL;

  let headers = <any>{
    accept: "application/json",
    referer: appURL,
  };

  const token = useCookie("sid");

  if (token.value) {
    headers["sid"] = token.value;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    };
  }

  return useFetch(`${appURL}/api/v1/${path}`, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
}
