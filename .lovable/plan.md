
# 修复与优化计划

## 问题总结

用户反馈了5个问题：
1. Hero 标题"以专业精神，守护商业正义"需要改回原来的文案
2. "预约面谈"按钮在浅色模式下显示不清楚
3. 专业团队头像照片显示不清楚（因为 `img-professional` 的 `mix-blend-mode: multiply` + 降饱和度导致）
4. 业务领域的"了解详情"点击无反应，需要添加展开内容
5. 律师团队的"展开详情"内容太少，需要扩充每位律师的详细介绍

---

## 修改方案

### 1. 恢复 Hero 标题

将"以专业精神，守护商业正义"改回之前的文案。需要确认原始文案是什么——根据上下文推测应是改动前的标题。

> 需要向用户确认：原来的标题具体是什么内容？

### 2. 修复"预约面谈"按钮浅色模式可见性

**文件**: `src/components/HeroSection.tsx`

Hero 区域始终使用深色背景（bg-navy/70 遮罩），按钮样式 `border-navy-foreground/40 text-navy-foreground` 在 Hero 内不受主题影响。但如果 Navbar 中的"预约面谈"按钮在浅色模式下不清楚，需要将 Navbar 的按钮颜色从 `text-gold`（在白色导航背景上可能不够醒目）调整为更高对比度的样式。

- Navbar 滚动后背景变为 `bg-navy/95`，按钮 `text-gold` 应该可见
- 未滚动时背景透明（Hero深色背景），也应该可见
- 如果问题出在 Hero 区的按钮，将 `border-navy-foreground/40` 改为 `border-gold/60 text-gold` 以提升对比度

### 3. 修复律师头像显示不清楚

**文件**: `src/components/TeamSection.tsx`

移除头像上的 `img-professional` class。该 class 应用了 `mix-blend-mode: multiply` 和 `saturate(0.8)`，导致人像照片偏暗模糊。头像照片应保持原始清晰度。

### 4. 业务领域添加展开内容

**文件**: `src/components/ServicesSection.tsx`

- 为每个服务项添加 `description` 字段，包含2-3段详细的服务描述
- 添加 `useState` 控制展开/收起状态
- "了解详情 →" 点击后展开显示详细内容，文字变为"收起"

每个服务项扩展内容示例：
- 争议解决：介绍团队在商事诉讼、仲裁中的专业能力和代表性业绩
- 公司商事：并购流程支持、合规体系搭建等详细说明
- 其余四个领域类似扩展

### 5. 扩充律师详细介绍

**文件**: `src/components/TeamSection.tsx`

为每位律师的 `bio` 字段大幅扩充内容，包括：
- 教育背景（如"毕业于北京大学法学院"）
- 执业年限与经历
- 代表性案件/项目（脱敏处理）
- 专业资质与荣誉
- 社会兼职（如仲裁员、行业协会成员等）

展开后显示完整的3-5段介绍，收起时仅显示3行摘要。

---

## 技术细节

### 涉及文件
| 文件 | 改动 |
|------|------|
| `src/components/HeroSection.tsx` | 恢复标题文案，调整按钮样式 |
| `src/components/TeamSection.tsx` | 移除头像 `img-professional`，扩充律师 bio |
| `src/components/ServicesSection.tsx` | 添加展开/收起逻辑和详细描述数据 |

### ServicesSection 改造要点
- 将服务卡片提取为独立组件 `ServiceCard`，内含 `useState`
- 为 `services` 数组每项添加 `description: string` 字段
- 点击"了解详情"切换展开状态，展示详细描述段落

### TeamSection 改造要点
- 移除 `img` 标签上的 `img-professional` class
- 将每位律师的 `bio` 从1段扩展为包含教育背景、执业经历、代表案件、资质荣誉的完整介绍
