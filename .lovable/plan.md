

# AI 智能案情分析功能

## 功能概述

当用户在"预约面谈"表单中输入案情描述后，点击"AI 分析"按钮（或停止输入一段时间后自动触发），系统会调用 AI 对案情进行分析，返回：
- **建议案件类型** — 自动填充到案件类型下拉框
- **初步法律分析** — 以卡片形式展示在表单下方，包含涉及法律领域、关键法律要点、建议方向等

## 实现步骤

### 1. 创建后端函数 `analyze-case`

新建 `supabase/functions/analyze-case/index.ts`，使用 Lovable AI（tool calling 模式）提取结构化输出：

- 接收 `{ description: string }` 
- 调用 AI Gateway，使用 tool calling 返回结构化 JSON：
  - `case_type`: 建议的案件类型（从预设列表中选择）
  - `summary`: 一句话概括案情
  - `legal_areas`: 涉及的法律领域
  - `key_points`: 关键法律要点（2-4 条）
  - `suggested_actions`: 建议下一步行动
- 处理 429/402 等错误

### 2. 更新 `supabase/config.toml`

为新函数添加配置，设置 `verify_jwt = false`。

### 3. 修改 `ContactSection.tsx`

- 在案情描述输入框旁添加"AI 智能分析"按钮
- 点击后调用 `analyze-case` 函数
- 收到结果后：
  - 自动将建议的案件类型填入下拉框（用户可修改）
  - 在表单下方显示一个分析结果卡片，包含法律要点和建议方向
- 添加加载状态（分析中...动画）
- 错误时显示 toast 提示

## 用户体验流程

1. 用户填写案情描述
2. 点击描述框下方的"AI 智能分析"按钮
3. 按钮变为加载状态，显示"分析中..."
4. 分析完成后：
   - 案件类型下拉框自动选中 AI 建议的类型（带提示"AI 建议"）
   - 下方出现分析结果卡片，包含要点列表
5. 用户可以修改案件类型、继续编辑描述
6. 最终点击"提交预约"

## 技术细节

### Edge Function 结构化输出（tool calling）

```text
tool: analyze_case
参数:
  - case_type: enum (争议解决/公司商事/知识产权/资本市场/刑事辩护/劳动人事/其他)
  - summary: string
  - legal_areas: string[]
  - key_points: string[]  
  - suggested_actions: string[]
```

### 前端状态管理

- 新增 `analyzing` 布尔状态控制加载
- 新增 `analysisResult` 状态存储 AI 返回结果
- 使用 `form.setValue("caseType", result.case_type)` 自动填充

### UI 组件

- 分析按钮：使用 `Sparkles` 图标 + "AI 智能分析"文字
- 结果卡片：使用现有的 Card 组件，列表项前带图标

