import { EnrichedTranscript } from '../types';

export interface MediaProvider {
  ingest(url: string): Promise<{
    transcript: EnrichedTranscript;
    audioBuffer?: Buffer;
  }>;
}
