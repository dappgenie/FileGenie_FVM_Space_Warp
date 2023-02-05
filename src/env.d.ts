/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NFT_STORAGE_API_KEY: string
  readonly VITE_WEB3_STORAGE_API_KEY: string
  readonly VITE_FB_API_KEY: string
  readonly VITE_FB_AUTH_DOMAIN: string
  readonly VITE_FB_PROJECT_ID: string
  readonly VITE_FB_STORAGE_BUCKET: string
  readonly VITE_FB_MESSAGING_SENDER_ID: string
  readonly VITE_FB_APP_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
