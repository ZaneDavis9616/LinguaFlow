import { MediaProvider } from './provider';
import { EnrichedTranscript } from '../types';

export class LocalFileProvider implements MediaProvider {
  async ingest(filePath: string): Promise<EnrichedTranscript> {
    console.log(`Ingesting from local file: ${filePath}`);
    // TODO: Implement local file ingestion logic
    // This would involve reading the file from the filesystem
    // For now, returning a mock object.
    return {} as EnrichedTranscript; // Placeholder
  }
}
