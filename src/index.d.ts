import { type $Fetch, type NitroFetchRequest } from 'nitropack'

declare module '#app' {
  interface NuxtApp {
    $authFetch: $Fetch<unknown, NitroFetchRequest>
  }
}

export {}
