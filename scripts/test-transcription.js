require('dotenv').config();
const fs = require('fs');
const path = require('path');

// 导入编译后的 JavaScript 文件
const { TranscriptionEngine } = require('../dist/transcription');

async function testTranscription() {
  console.log('🎤 开始测试 Google Cloud Speech-to-Text API...\n');

  // 检查环境变量
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ 错误: 未设置 GOOGLE_APPLICATION_CREDENTIALS 环境变量');
    console.log('\n请按以下步骤设置：');
    console.log('1. 在 Google Cloud 控制台创建服务账号');
    console.log('2. 下载 JSON 密钥文件');
    console.log('3. 设置环境变量：');
    console.log('   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"');
    console.log('   或者在 .env 文件中添加：');
    console.log('   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/key.json');
    return;
  }

  // 检查密钥文件是否存在
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!fs.existsSync(keyPath)) {
    console.error(`❌ 错误: 密钥文件不存在: ${keyPath}`);
    return;
  }

  console.log('✅ 环境变量配置正确');
  console.log(`📁 密钥文件: ${keyPath}\n`);

  // 检查测试音频文件
  const audioPath = path.join(__dirname, '..', 'test-audio.wav');
  if (!fs.existsSync(audioPath)) {
    console.error('❌ 错误: 测试音频文件不存在');
    console.log('\n请先运行以下命令下载测试音频：');
    console.log('node scripts/download-test-audio.js');
    return;
  }

  console.log('✅ 测试音频文件存在');
  console.log(`📁 音频文件: ${audioPath}`);
  console.log(`📊 文件大小: ${fs.statSync(audioPath).size} bytes\n`);

  try {
    // 读取音频文件
    console.log('📖 读取音频文件...');
    const audioBuffer = fs.readFileSync(audioPath);
    console.log(`✅ 音频文件读取成功，大小: ${audioBuffer.length} bytes\n`);

    // 创建转写引擎
    console.log('🔧 初始化转写引擎...');
    const transcriptionEngine = new TranscriptionEngine();
    console.log('✅ 转写引擎初始化成功\n');

    // 执行转写
    console.log('🎯 开始语音转写...');
    const startTime = Date.now();
    const transcript = await transcriptionEngine.transcribe(audioBuffer);
    const endTime = Date.now();

    console.log(`✅ 转写完成！耗时: ${endTime - startTime}ms\n`);

    // 显示结果
    console.log('📝 转写结果:');
    console.log('='.repeat(50));
    console.log(`ID: ${transcript.id}`);
    console.log(`源语言: ${transcript.languages.source}`);
    console.log(`目标语言: ${transcript.languages.target}`);
    console.log(`片段数量: ${transcript.segments.length}`);
    console.log('\n转写内容:');
    
    transcript.segments.forEach((segment, index) => {
      console.log(`[${index + 1}] [${segment.startTime.toFixed(2)}s - ${segment.endTime.toFixed(2)}s] ${segment.textSource}`);
    });

    console.log('\n🎉 测试成功完成！');

  } catch (error) {
    console.error('❌ 转写过程中发生错误:');
    console.error(error.message);
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 可能的解决方案：');
      console.log('1. 检查密钥文件路径是否正确');
      console.log('2. 确认服务账号有 Speech-to-Text API 权限');
      console.log('3. 确认已启用 Speech-to-Text API');
    }
  }
}

// 运行测试
testTranscription().catch(console.error); 