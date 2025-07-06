import { MediaProvider } from './provider';
import { EnrichedTranscript } from '../types';
import youtubedl from 'youtube-dl-exec';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import ffmpegPath from 'ffmpeg-static';

export class YouTubeProvider implements MediaProvider {
  async ingest(url: string): Promise<{ transcript: EnrichedTranscript; audioBuffer?: Buffer }> {
    console.log(`Ingesting from YouTube: ${url}`);
    try {
      const audioBuffer = await downloadAndExtractAudioFromYouTube(url);
      // 这里只返回最小结构，后续可集成转写
      const transcript: EnrichedTranscript = {
        id: 'youtube-audio-' + Date.now(),
        sourceMedia: {
          type: 'youtube',
          url: url,
        },
        languages: {
          source: 'en',
          target: 'en',
        },
        segments: [],
        userProfile: {
          knownVocabulary: new Set(),
        },
      };
      return { transcript, audioBuffer };
    } catch (err) {
      console.error('YouTube 音频提取失败:', err);
      console.log('💡 提示: 请检查网络连接或视频是否可访问');
      
      // 返回降级方案：空的 transcript，不包含 audioBuffer
      const transcript: EnrichedTranscript = {
        id: 'youtube-fallback-' + Date.now(),
        sourceMedia: {
          type: 'youtube',
          url: url,
        },
        languages: {
          source: 'en',
          target: 'en',
        },
        segments: [],
        userProfile: {
          knownVocabulary: new Set(),
        },
      };
      return { transcript };
    }
  }
}

export async function downloadAndExtractAudioFromYouTube(url: string): Promise<Buffer> {
  console.log('🔍 验证 YouTube URL...');
  
  // 创建临时文件路径
  const tempDir = os.tmpdir();
  const outputPath = path.join(tempDir, `youtube-audio-${Date.now()}.%(ext)s`);
  
  try {
    console.log('📥 开始下载音频...');
    
    // 使用 youtube-dl-exec 下载音频，不强制转换格式
    const result = await youtubedl(url, {
      extractAudio: true,
      audioQuality: 0, // 最高质量
      output: outputPath,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      ],
      // 如果有 ffmpeg，则转换为 wav
      ...(ffmpegPath && {
        audioFormat: 'wav',
        ffmpegLocation: ffmpegPath
      })
    });

    console.log('✅ 音频下载完成');
    
    // 查找下载的文件（可能扩展名不是 .wav）
    const files = fs.readdirSync(tempDir);
    const downloadedFile = files.find(file => file.startsWith('youtube-audio-') && file.includes(path.basename(outputPath).split('.')[0]));
    
    if (!downloadedFile) {
      throw new Error('下载的文件不存在');
    }
    
    const fullPath = path.join(tempDir, downloadedFile);
    console.log(`📁 找到下载文件: ${downloadedFile}`);
    
    // 读取音频文件
    const audioBuffer = fs.readFileSync(fullPath);
    console.log(`📊 音频大小: ${audioBuffer.length} bytes`);
    
    // 清理临时文件
    try {
      fs.unlinkSync(fullPath);
    } catch (cleanupError) {
      console.warn('清理临时文件失败:', cleanupError);
    }
    
    return audioBuffer;
    
  } catch (error) {
    // 清理临时文件（如果存在）
    try {
      const files = fs.readdirSync(tempDir);
      const downloadedFile = files.find(file => file.startsWith('youtube-audio-') && file.includes(path.basename(outputPath).split('.')[0]));
      if (downloadedFile) {
        fs.unlinkSync(path.join(tempDir, downloadedFile));
      }
    } catch (cleanupError) {
      // 忽略清理错误
    }
    
    console.error('YouTube 下载错误:', error);
    throw new Error(`YouTube 下载失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
