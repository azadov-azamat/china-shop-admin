/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_HOST: string;
  // Qo'shimcha o'zgaruvchilar bo'lsa, ularni qo'shing
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
