# LinguaFlow CI/CD 配置说明

## 概述

本项目配置了完整的 CI/CD 流程，使用 GitHub Actions 自动化构建、测试和部署。

## CI/CD 流程

### 触发条件
- 推送到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop` 分支

### 执行任务

#### 1. 后端测试和构建 (`backend`)
- 安装依赖
- TypeScript 类型检查
- 运行单元测试
- 构建项目

#### 2. 前端测试和构建 (`frontend`)
- 安装依赖
- TypeScript 类型检查
- 运行单元测试（包含覆盖率）
- 构建 React 应用
- 上传构建产物

#### 3. 代码质量检查 (`lint`)
- ESLint 代码规范检查
- 支持 TypeScript 和 React 代码

#### 4. 安全扫描 (`security`)
- npm audit 安全漏洞检查
- 检查后端和前端依赖

#### 5. 自动部署 (`deploy`)
- 仅在 `main` 分支触发
- 部署前端到 GitHub Pages
- 需要所有前置任务成功

## 本地开发

### 安装依赖
```bash
# 后端依赖
npm install

# 前端依赖
cd client && npm install
```

### 运行测试
```bash
# 后端测试
npm test

# 前端测试
cd client && npm test
```

### 代码检查
```bash
# 后端代码检查
npm run lint
npm run type-check

# 前端代码检查
cd client && npm run lint
```

### 构建
```bash
# 后端构建
npm run build

# 前端构建
cd client && npm run build
```

## 配置文件

- `.github/workflows/ci.yml` - GitHub Actions 配置
- `.eslintrc.js` - ESLint 配置
- `jest.config.js` - Jest 测试配置
- `tsconfig.json` - TypeScript 配置

## 部署

### GitHub Pages
前端应用会自动部署到 GitHub Pages，访问地址：
`https://zanedavis9616.github.io/LinguaFlow/`

### 手动部署
如果需要手动部署到其他平台，可以：
1. 在 GitHub Actions 中下载构建产物
2. 使用构建产物进行部署

## 故障排除

### 常见问题

1. **测试失败**
   - 检查测试文件是否正确
   - 确保所有依赖已安装

2. **构建失败**
   - 检查 TypeScript 类型错误
   - 确保所有导入路径正确

3. **ESLint 错误**
   - 运行 `npm run lint:fix` 自动修复
   - 手动修复代码规范问题

### 查看日志
在 GitHub 仓库的 Actions 标签页中查看详细的执行日志。

## 扩展配置

### 添加新的检查
1. 在 `.github/workflows/ci.yml` 中添加新的 job
2. 配置相应的检查步骤

### 自定义部署
1. 修改 deploy job 中的部署步骤
2. 添加相应的环境变量和密钥

### 性能优化
- 使用缓存减少构建时间
- 并行执行独立的任务
- 优化依赖安装策略 