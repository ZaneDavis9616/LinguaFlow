// LinguaFlow 核心数据结构：EnrichedTranscript
export interface EnrichedTranscript {
  readonly id: string;
  readonly sourceMedia: {
    readonly type: 'youtube' | 'podcast' | 'local';
    readonly url: string;
  };
  readonly languages: {
    readonly source: string; // e.g., 'ja'
    readonly target: string; // e.g., 'en'
  };
  readonly segments: Array<{
    readonly id: string;
    readonly startTime: number;
    readonly endTime: number;
    readonly textSource: string;
    readonly textTarget: string;
    readonly phoneticTranscription?: string; // e.g., Pinyin, Romaji
    readonly tokens: ReadonlyArray<{
      readonly word: string;
      readonly definition: string;
      readonly partOfSpeech: string;
    }>;
    // 用户交互产生的数据
    readonly userAttempt?: {
      readonly recordingUrl: string;
      readonly pronunciationScore: number;
      readonly timestamp: Date;
    };
  }>;
  readonly userProfile: {
    readonly knownVocabulary: ReadonlySet<string>;
  };
}
