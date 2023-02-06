/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NFT_STORAGE_API_KEY: string
  readonly VITE_WEB3_STORAGE_API_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
