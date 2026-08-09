# 鼎盛律师事务所 · 官网

一个面向律师事务所的单页官网，包含业务展示、团队介绍、代表业绩，以及两个 AI 能力：**AI 法律咨询助手（文字对话）** 与 **AI 语音接待（Retell 实时通话）**。前端基于 Vite + React + TypeScript，后端逻辑运行在 Supabase Edge Functions 上。

线上体验（Lovable 项目）：<https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID>

> ⚠️ 请把上面的 `REPLACE_WITH_PROJECT_ID` 替换成真实的 Lovable 项目 ID。

---

## 功能一览

| 模块 | 说明 | 相关文件 |
| --- | --- | --- |
| 首页展示 | 首屏、信任背书、业务领域、团队、案例、数据、页脚 | `src/components/` |
| 预约表单 | 表单校验（zod）→ 写入 Supabase 数据库 → 邮件通知 | `ContactSection.tsx` / `submit-contact` |
| AI 案情分析 | 填写案情后一键生成结构化初步分析，并自动回填案件类型 | `ContactSection.tsx` / `analyze-case` |
| AI 法律咨询 | 右下角悬浮聊天窗，SSE 流式输出，支持 Markdown 渲染 | `LegalChatWidget.tsx` / `legal-chat` |
| AI 语音接待 | 左下角一键拨号，与语音坐席「小鼎」实时通话，支持静音 | `RetellWidget.tsx` / `retell-web-call` |
| 深色模式 | 跟随系统偏好，可手动切换并记忆在 localStorage | `src/hooks/use-theme.ts` |

---

## 技术栈

- **构建工具**：Vite 5（SWC 插件）
- **框架**：React 18 + TypeScript 5
- **样式**：Tailwind CSS 3 + shadcn/ui（Radix UI）
- **动效**：Framer Motion
- **表单**：React Hook Form + Zod
- **数据/后端**：Supabase（Postgres + Edge Functions，Deno 运行时）
- **语音**：Retell AI Web SDK
- **测试**：Vitest + Testing Library（jsdom 环境）

---

## 本地开发

前置要求：Node.js ≥ 18（推荐用 [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 安装）。

```sh
# 1. 克隆仓库
git clone https://github.com/245678000000/justice-glow-web.git
cd justice-glow-web

# 2. 安装依赖
npm install

# 3. 配置环境变量（见下一节）
cp .env.example .env

# 4. 启动开发服务器（默认 http://localhost:8080）
npm run dev
```

### 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器，带热更新 |
| `npm run build` | 生产构建，产物输出到 `dist/` |
| `npm run build:dev` | 以 development 模式构建（便于排查线上问题） |
| `npm run preview` | 本地预览生产构建产物 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查（不产出文件） |
| `npm test` | 运行一次单元测试 |
| `npm run test:watch` | 监听模式运行测试 |

---

## 环境变量

### 前端（`.env`，会被打包进浏览器产物）

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | ✅ | Supabase 项目地址，例如 `https://xxxx.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | ✅ | Supabase 匿名公开密钥（anon key，设计上可公开） |
| `VITE_SUPABASE_PROJECT_ID` | — | Supabase 项目 ID，供工具链使用 |
| `VITE_RETELL_AGENT_ID` | — | Retell 语音坐席 ID；不填则使用代码中的默认值 |

> **所有 `VITE_` 前缀的变量都会出现在打包后的 JS 里**，只能放公开信息。任何真正的密钥必须放在 Edge Function 的服务端环境变量中。

### 服务端（Supabase Edge Functions 的 Secrets）

| 变量 | 使用方 | 说明 |
| --- | --- | --- |
| `LOVABLE_API_KEY` | `legal-chat` / `analyze-case` | Lovable AI Gateway 密钥 |
| `RETELL_API_KEY` | `retell-web-call` | Retell AI 服务端密钥 |
| `RETELL_ALLOWED_AGENT_IDS` | `retell-web-call` | 允许拨打的坐席 ID 白名单，逗号分隔；不配置则不限制 |
| `SUPABASE_URL` | `submit-contact` | 由 Supabase 平台自动注入 |
| `SUPABASE_SERVICE_ROLE_KEY` | `submit-contact` | 由 Supabase 平台自动注入，切勿泄露 |
| `RESEND_API_KEY` | `submit-contact` | Resend 邮件服务密钥；不配置则跳过邮件通知 |
| `NOTIFICATION_EMAIL` | `submit-contact` | 接收新咨询通知的邮箱 |
| `ALLOWED_ORIGINS` | 全部函数 | 允许跨域访问的站点，逗号分隔；不配置则放行全部（仅建议在开发期这样做） |

设置方式：

```sh
supabase secrets set LOVABLE_API_KEY=xxx RETELL_API_KEY=xxx
```

---

## 后端结构

```
supabase/
├── config.toml                     # 函数配置（哪些函数免 JWT 校验）
├── migrations/                     # 数据库迁移
│   └── *_contact_submissions.sql   # 咨询表 + 行级安全策略
└── functions/
    ├── legal-chat/                 # AI 法律咨询，SSE 流式转发
    ├── analyze-case/               # 案情结构化分析（function calling）
    ├── retell-web-call/            # 创建 Retell 网页通话，换取 access_token
    └── submit-contact/             # 保存咨询表单 + 发送邮件通知
```

数据库表 `contact_submissions` 已开启 RLS：**允许匿名写入，不允许任何公开读取**，后台读取需使用 service role 密钥。

部署函数与迁移：

```sh
supabase functions deploy legal-chat analyze-case retell-web-call submit-contact
supabase db push
```

---

## 目录结构

```
src/
├── assets/            # 首屏背景图、律师头像
├── components/        # 页面区块组件
│   └── ui/            # shadcn/ui 基础组件
├── hooks/             # use-theme / use-mobile / use-toast
├── integrations/
│   └── supabase/      # Supabase 客户端与数据库类型（自动生成）
├── lib/               # 工具函数
├── pages/             # Index / Privacy / NotFound
└── test/              # Vitest 配置与用例
```

---

## 部署

- **Lovable**：打开 Lovable 项目 → Share → Publish。绑定自定义域名见 [官方文档](https://docs.lovable.dev/features/custom-domain#custom-domain)。
- **自行部署**：`npm run build` 后把 `dist/` 目录部署到任意静态托管（Vercel、Netlify、Cloudflare Pages、Nginx 均可）。因为使用了前端路由，需要把所有未命中的路径回退到 `index.html`。

---

## 免责声明

本站及站内 AI 功能输出的内容仅供参考，**不构成正式法律意见**。具体案件请咨询执业律师。站内展示的所长信息、地址、电话、备案号等均为示例数据，正式上线前请替换为真实信息。
