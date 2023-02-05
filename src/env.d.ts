/// <reference types="vite/client" />

interface ImportMetaEnv {
<<<<<<< HEAD:ui/src/env.d.ts
  readonly VITE_API_URL: string
  readonly VITE_NFT_STORAGE_API_KEY: string
  readonly VITE_WEB3_STORAGE_API_KEY: string
=======
  readonly VITE_FB_API_KEY: string
  readonly VITE_FB_AUTH_DOMAIN: string
  readonly VITE_FB_PROJECT_ID: string
  readonly VITE_FB_STORAGE_BUCKET: string
  readonly VITE_FB_MESSAGING_SENDER_ID: string
  readonly VITE_FB_APP_ID: string
>>>>>>> 64c0f5072b973169c510e96716d807eed0b3bcd7:src/env.d.ts
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
