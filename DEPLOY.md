# Vercel 部署指南

## 方式一：通过 Vercel Dashboard（推荐）

### 1. 连接 GitHub 仓库

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New Project"
3. 选择 GitHub 仓库：`Errance/hex`
4. 点击 "Import"

### 2. 配置项目

**Framework Preset**: Next.js（自动检测）

**Root Directory**: `hex-oracle`（如果仓库根目录不是项目目录）

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. 配置环境变量

在 "Environment Variables" 部分添加以下变量：

```
OPENROUTER_API_KEY=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
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=deepseek/deepseek-v3.2-exp
```

**注意**：所有环境都添加（Production, Preview, Development）

### 4. 部署

点击 "Deploy" 按钮，等待部署完成（约 2-3 分钟）

### 5. 绑定已有项目（如果项目已存在）

如果项目 ID `prj_Rgi7HYrgisGr0WTaX2kocOK0jMlK` 已存在：

1. 进入项目设置
2. 在 "Git" 选项卡连接 GitHub 仓库
3. 配置环境变量
4. 触发重新部署

---

## 方式二：通过 Vercel CLI

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

或使用 npx（无需安装）：

```bash
npx vercel
```

### 2. 登录

```bash
vercel login
```

### 3. 部署

在项目目录运行：

```bash
cd hex-oracle
vercel --prod
```

### 4. 设置环境变量

```bash
vercel env add OPENROUTER_API_KEY
vercel env add OPENROUTER_BASE_URL
vercel env add OPENROUTER_MODEL
```

或通过 Dashboard 设置：
https://vercel.com/项目名/settings/environment-variables

---

## 环境变量说明

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | OpenRouter API 密钥 |
| `OPENROUTER_BASE_URL` | `https://openrouter.ai/api/v1` | OpenRouter API 基础 URL |
| `OPENROUTER_MODEL` | `deepseek/deepseek-v3.2-exp` | 使用的 AI 模型 |

---

## 验证部署

部署完成后：

1. 访问分配的 Vercel URL（如 `https://hex-xxx.vercel.app`）
2. 测试功能：
   - [ ] 中英文切换
   - [ ] 主题切换（禅道 / 风水现代）
   - [ ] 自动占卜
   - [ ] 手动占卜
   - [ ] AI 解读（需要登录）
   - [ ] 历史记录

---

## 常见问题

### Q: API 调用失败？
A: 检查环境变量是否正确设置，特别是 `OPENROUTER_API_KEY`

### Q: 构建失败？
A: 查看构建日志，通常是依赖问题或 TypeScript 错误

### Q: 如何更新部署？
A: 推送代码到 GitHub main 分支，Vercel 会自动重新部署

---

## 项目信息

- **Project ID**: prj_Rgi7HYrgisGr0WTaX2kocOK0jMlK
- **GitHub**: https://github.com/Errance/hex
- **Framework**: Next.js 15
- **Node**: 18.x 或 20.x

