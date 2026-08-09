/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase 项目地址，例如 https://xxxx.supabase.co */
  readonly VITE_SUPABASE_URL: string;
  /** Supabase 匿名公开密钥（anon key），设计上可公开 */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_SUPABASE_PROJECT_ID?: string;
  /** Retell 语音坐席 ID，不填则使用代码内置默认值 */
  readonly VITE_RETELL_AGENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
