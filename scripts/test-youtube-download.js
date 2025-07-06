require('dotenv').config();
const { downloadAndExtractAudioFromYouTube } = require('../dist/media-ingestion/youtube-provider');
const fs = require('fs');
const path = require('path');

async function testYouTubeDownload() {
  console.log('🎬 测试 YouTube 音频下载功能...\n');

  // 测试用的 YouTube URL（一个简短的公开视频）
  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll (可能有问题)
    'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Me at the zoo (YouTube 第一个视频)
    'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - GANGNAM STYLE
  ];

  for (const url of testUrls) {
    console.log(`\n🔗 测试 URL: ${url}`);
    try {
      const startTime = Date.now();
      const audioBuffer = await downloadAndExtractAudioFromYouTube(url);
      const endTime = Date.now();

      console.log(`✅ 下载成功！`);
      console.log(`📊 音频大小: ${audioBuffer.length} bytes`);
      console.log(`⏱️  耗时: ${endTime - startTime}ms`);

      // 保存音频文件用于测试
      const outputPath = path.join(__dirname, '..', `test-youtube-${Date.now()}.wav`);
      fs.writeFileSync(outputPath, audioBuffer);
      console.log(`💾 音频已保存到: ${outputPath}`);

      // 只测试第一个成功的 URL
      break;

    } catch (error) {
      console.error(`❌ 下载失败: ${error.message}`);
      console.log('🔄 尝试下一个 URL...\n');
    }
  }

  console.log('\n🎉 测试完成！');
}

testYouTubeDownload().catch(console.error); 