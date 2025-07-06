require('dotenv').config();
const { downloadAndExtractAudioFromYouTube } = require('../dist/media-ingestion/youtube-provider');

async function testYouTubeDownload() {
  console.log('🎬 简单测试 YouTube 音频下载...\n');

  // 使用一个简短的测试视频
  const testUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'; // YouTube 第一个视频，很短
  
  console.log(`🔗 测试 URL: ${testUrl}`);
  
  try {
    const startTime = Date.now();
    const audioBuffer = await downloadAndExtractAudioFromYouTube(testUrl);
    const endTime = Date.now();

    console.log(`✅ 下载成功！`);
    console.log(`📊 音频大小: ${audioBuffer.length} bytes`);
    console.log(`⏱️  耗时: ${endTime - startTime}ms`);
    console.log(`🎵 音频格式: ${audioBuffer.length > 0 ? '有效音频数据' : '空数据'}`);

  } catch (error) {
    console.error(`❌ 下载失败: ${error.message}`);
    console.error('详细错误:', error);
  }

  console.log('\n🎉 测试完成！');
}

testYouTubeDownload().catch(console.error); 