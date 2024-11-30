import { type $Fetch, type NitroFetchRequest } from 'nitropack'
import type { IUseAuthStore } from './stores/useAuthStore'

declare module '#app' {
  interface NuxtApp {
    $authFetch: $Fetch<unknown, NitroFetchRequest>,
    $auth: () => IUseAuthStore
  }
}

export {}
