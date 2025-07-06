import { EnrichedTranscript } from '../types';

export interface MediaProvider {
  ingest(url: string): Promise<EnrichedTranscript>;
}
