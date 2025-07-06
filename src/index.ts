import 'dotenv/config';
import { createMediaProvider } from './media-ingestion';
import { TranscriptionEngine } from './transcription';
import { LearningSession } from './learning-interface';
import { UserStateService } from './user-state';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('🚀 LinguaFlow 启动中...\n');

  // 检查环境变量
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn('⚠️  警告: 未设置 GOOGLE_APPLICATION_CREDENTIALS，将使用 mock 数据');
    console.log('💡 提示: 设置环境变量后可体验真实的语音转写功能\n');
  }

  // 完整流程：YouTube下载→音频转写→学习界面
  const source = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'; // YouTube 第一个视频，测试成功
  console.log('📥 开始媒体摄入...');
  const mediaProvider = createMediaProvider(source);
  const { transcript: mediaTranscript, audioBuffer } = await mediaProvider.ingest(source);

  let transcript = mediaTranscript;
  if (audioBuffer && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log('🎤 开始内容转写...');
    const transcriptionEngine = new TranscriptionEngine();
    transcript = await transcriptionEngine.transcribe(audioBuffer);
  } else {
    console.log('⚠️  未获取到音频 Buffer 或未配置 Google Cloud，使用 mock 数据');
  }

  // 3. Interactive Learning
  console.log('🎓 启动学习界面...');
  const learningSession = new LearningSession(transcript);
  learningSession.render();

  // 4. Progress Tracking
  console.log('📊 保存学习进度...');
  const userStateService = new UserStateService();
  await userStateService.saveTranscript(transcript);

  console.log('\n✅ LinguaFlow 运行完成！');
}

async function testRealTranscription() {
  console.log('🧪 测试真实语音转写功能...');
  
  const audioPath = path.join(__dirname, '..', 'test-audio.wav');
  
  if (!fs.existsSync(audioPath)) {
    console.log('📝 测试音频文件不存在，跳过真实转写测试');
    console.log('💡 提示: 运行 "node scripts/download-test-audio.js" 下载测试音频\n');
    return;
  }

  try {
    const audioBuffer = fs.readFileSync(audioPath);
    const transcriptionEngine = new TranscriptionEngine();
    
    console.log('🎯 开始真实语音转写...');
    const startTime = Date.now();
    const transcript = await transcriptionEngine.transcribe(audioBuffer);
    const endTime = Date.now();

    console.log(`✅ 真实转写完成！耗时: ${endTime - startTime}ms`);
    console.log(`📝 转写片段数: ${transcript.segments.length}`);
    
    if (transcript.segments.length > 0) {
      console.log('📄 转写内容预览:');
      transcript.segments.slice(0, 3).forEach((segment, index) => {
        console.log(`  [${index + 1}] ${segment.textSource}`);
      });
    }
    
    console.log('');
  } catch (error) {
    console.error('❌ 真实转写测试失败:', error instanceof Error ? error.message : String(error));
    console.log('💡 提示: 检查 Google Cloud 配置和网络连接\n');
  }
}

main().catch(console.error);