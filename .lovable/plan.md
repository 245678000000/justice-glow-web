

# 深色模式修复 + 执业证号真实化 + Hero 标题恢复

## 问题概述

1. **深色模式文字不清楚** — 多个组件在深色模式下存在对比度问题
2. **执业证号都是 X** — 需要替换为逼真的数字
3. **Hero 标题** — 从"鼎盛律师事务所"改回口号式标题

---

## 修改方案

### 1. Hero 标题恢复为口号

**文件**: `src/components/HeroSection.tsx`

将标题从"鼎盛律师事务所"改为专业口号，例如：

> **以专业精神，守护商业正义**

副标题保持现有描述不变。

### 2. 深色模式对比度修复

**核心问题**: 深色模式下 `--background`（218 50% 10%）与 `--navy`（218 50% 10%）几乎相同，导致部分区域文字与背景融为一体。需要逐个检查以下组件：

| 组件 | 问题 | 修复 |
|------|------|------|
| `Navbar.tsx` | 滚动后 `bg-navy/95` 在深色模式下与页面背景混淆 | 深色模式下改用 `dark:bg-card/95` 或增加边框区分 |
| `TrustBar.tsx` | `bg-secondary` 上的 `text-foreground` 和 `text-muted-foreground` 对比度不足 | 确认颜色对比度，必要时提高文字亮度 |
| `ServicesSection.tsx` | `bg-card` 卡片边框在深色模式下不明显 | 增强 `border-border` 在深色模式的亮度 |
| `ContactSection.tsx` | 表单输入框和标签在深色背景下可能不清楚 | 确保 input 背景与页面背景有区分 |
| `CasesSection.tsx` | 案号 `text-muted-foreground/60` 过淡 | 提高至 `text-muted-foreground/80` |
| `Footer.tsx` | ICP 备案等 `text-navy-foreground/30` 过淡 | 提高至 `/40` 或 `/50` |
| `StatsSection.tsx` | `text-navy-foreground/60` 在深色模式偏暗 | 适当提高透明度 |

**CSS 变量调整**（`src/index.css`）:
- 深色模式下 `--border` 从 `220 25% 20%` 提高到约 `220 25% 25%`，让边框更清晰
- 深色模式下 `--muted-foreground` 从 `215 16% 60%` 微调到 `215 16% 65%`，提升辅助文字可读性

### 3. 执业证号真实化

将所有 `XXXXXXXX` 替换为逼真的数字格式：

**律师执业证号格式**: `1 + 4位地区码 + 4位年份 + 8位序号`

| 律师 | 新证号 |
|------|--------|
| 张伟明 | 11101200310528463 |
| 李雅琴 | 11101200511792804 |
| 王志强 | 11101200810647291 |
| 陈思远 | 11101201210853672 |
| 刘婉清 | 11101201410926138 |
| 赵鹏飞 | 11101201610783549 |

**TrustBar 执业许可证号**: `31110000MD0285364T`

**Footer ICP 备案号**: `京ICP备2019036842号-1`，执业许可证号同 TrustBar

---

## 涉及文件

| 文件 | 改动内容 |
|------|----------|
| `src/index.css` | 微调深色模式 CSS 变量（border、muted-foreground） |
| `src/components/HeroSection.tsx` | 标题改为口号 |
| `src/components/Navbar.tsx` | 深色模式导航栏背景和文字对比度 |
| `src/components/TeamSection.tsx` | 替换6位律师的执业证号 |
| `src/components/TrustBar.tsx` | 替换执业许可证号，检查深色模式文字 |
| `src/components/Footer.tsx` | 替换ICP和许可证号，提高深色模式文字透明度 |
| `src/components/CasesSection.tsx` | 提高案号文字在深色模式的可读性 |
| `src/components/StatsSection.tsx` | 提高深色模式文字对比度 |
| `src/components/ContactSection.tsx` | 确保表单在深色模式下清晰可用 |
| `src/components/ServicesSection.tsx` | 卡片边框和文字深色模式优化 |

