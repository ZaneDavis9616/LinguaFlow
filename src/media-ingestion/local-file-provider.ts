import { MediaProvider } from './provider';
import { EnrichedTranscript } from '../types';
import * as fs from 'fs';

export class LocalFileProvider implements MediaProvider {
  async ingest(filePath: string): Promise<{ transcript: EnrichedTranscript; audioBuffer?: Buffer }> {
    console.log(`Ingesting from local file: ${filePath}`);
    
    try {
      // 读取本地音频文件
      const audioBuffer = fs.readFileSync(filePath);
      
      const transcript: EnrichedTranscript = {
        id: 'local-file-' + Date.now(),
        sourceMedia: {
          type: 'local',
          url: filePath,
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
    } catch (error) {
      console.error('本地文件读取失败:', error);
      // 返回空的 transcript，不包含 audioBuffer
      const transcript: EnrichedTranscript = {
        id: 'local-file-error-' + Date.now(),
        sourceMedia: {
          type: 'local',
          url: filePath,
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
