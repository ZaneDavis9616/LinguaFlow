# 🎤 LinguaFlow 语音转写功能配置指南

## 概述

本指南将帮助你配置 LinguaFlow 的真实语音转写功能，使用 Google Cloud Speech-to-Text API。

## 前置要求

1. **Google Cloud 账号**
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 创建新项目或选择现有项目

2. **启用 Speech-to-Text API**
   - 在 Google Cloud Console 中搜索 "Speech-to-Text API"
   - 点击 "启用"

3. **创建服务账号**
   - 在 Google Cloud Console 中，进入 "IAM 和管理" > "服务账号"
   - 点击 "创建服务账号"
   - 填写服务账号名称（如：linguaflow-speech）
   - 点击 "创建并继续"
   - 在权限页面，选择 "Cloud Speech-to-Text 用户"
   - 点击 "完成"

4. **下载密钥文件**
   - 在服务账号列表中，点击刚创建的服务账号
   - 进入 "密钥" 标签页
   - 点击 "添加密钥" > "创建新密钥"
   - 选择 "JSON" 格式
   - 下载密钥文件到本地安全位置

## 配置步骤

### 1. 设置环境变量

#### 方法一：使用 .env 文件（推荐）
```bash
# 复制环境变量示例文件
cp env.example .env

# 编辑 .env 文件，设置你的密钥文件路径
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
```

#### 方法二：设置系统环境变量
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
```

### 2. 下载测试音频

```bash
# 下载测试音频文件
npm run download-audio
```

### 3. 测试配置

```bash
# 运行语音转写测试
npm run test-transcription
```

### 4. 运行完整应用

```bash
# 构建并运行应用
npm start

# 或者开发模式运行
npm run dev
```

## 测试音频文件

项目会自动下载一个测试音频文件 `test-audio.wav`。如果你想使用自己的音频文件：

1. 将你的音频文件重命名为 `test-audio.wav`
2. 确保音频格式为 WAV、MP3、FLAC 等 Google Cloud Speech-to-Text 支持的格式
3. 将文件放在项目根目录

## 支持的音频格式

Google Cloud Speech-to-Text 支持以下格式：
- **WAV** (推荐)
- **MP3**
- **FLAC**
- **OGG**
- **M4A**

## 语言支持

默认配置为英语 (en-US)，你可以修改以下文件来支持其他语言：

- `src/transcription/index.ts` - 修改 `languageCode` 参数
- `env.example` - 设置 `DEFAULT_LANGUAGE_CODE`

常用语言代码：
- 英语：`en-US`, `en-GB`
- 中文：`zh-CN`, `zh-TW`
- 日语：`ja-JP`
- 韩语：`ko-KR`
- 法语：`fr-FR`
- 德语：`de-DE`
- 西班牙语：`es-ES`

## 故障排除

### 1. 认证错误
```
Error: Could not load the default credentials
```
**解决方案：**
- 检查 `GOOGLE_APPLICATION_CREDENTIALS` 环境变量是否正确设置
- 确认密钥文件路径存在且可读
- 验证服务账号有 Speech-to-Text API 权限

### 2. API 未启用
```
Error: Speech-to-Text API has not been used in project
```
**解决方案：**
- 在 Google Cloud Console 中启用 Speech-to-Text API
- 等待几分钟让 API 生效

### 3. 配额限制
```
Error: Quota exceeded
```
**解决方案：**
- 检查 Google Cloud 项目的配额使用情况
- 考虑升级到付费账户（新用户有免费额度）

### 4. 音频格式不支持
```
Error: Invalid audio format
```
**解决方案：**
- 确保音频文件格式正确
- 尝试转换为 WAV 格式
- 检查音频文件是否损坏

## 性能优化

### 1. 音频质量
- 使用 16kHz 或更高的采样率
- 确保音频清晰，减少背景噪音
- 使用单声道音频（除非需要立体声）

### 2. 文件大小
- 对于长音频，考虑分段处理
- 压缩音频文件以减少传输时间
- 使用流式处理处理大文件

## 安全注意事项

1. **密钥文件安全**
   - 不要将密钥文件提交到版本控制系统
   - 使用 `.gitignore` 忽略 `.env` 文件和密钥文件
   - 定期轮换密钥

2. **API 使用限制**
   - 监控 API 使用量和费用
   - 设置使用配额和预算警报
   - 在生产环境中使用适当的权限

## 下一步

配置完成后，你可以：

1. **测试真实音频转写**
   - 使用自己的音频文件测试
   - 尝试不同的语言和音频格式

2. **集成到前端**
   - 在 React 前端中添加音频上传功能
   - 实现实时语音转写

3. **扩展功能**
   - 添加语音识别置信度评分
   - 实现多语言支持
   - 添加自定义词汇表

## 支持

如果遇到问题，请：

1. 检查 Google Cloud Console 的错误日志
2. 查看项目的 GitHub Issues
3. 参考 [Google Cloud Speech-to-Text 文档](https://cloud.google.com/speech-to-text/docs)

---

🎉 **恭喜！** 你现在已经配置好了 LinguaFlow 的真实语音转写功能！ 