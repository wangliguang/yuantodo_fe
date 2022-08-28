/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_MODE: "production" | "development"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}