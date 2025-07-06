import { createMediaProvider } from './media-ingestion';
import { TranscriptionEngine } from './transcription';
import { LearningSession } from './learning-interface';
import { UserStateService } from './user-state';

async function main() {
  const source = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Example YouTube URL

  // 1. Media Ingestion (still using mock data for now)
  const mediaProvider = createMediaProvider(source);
  await mediaProvider.ingest(source); // Just call ingest to simulate the process

  // 2. Content Transcription (using mock data for now)
  const transcriptionEngine = new TranscriptionEngine();
  // Reverting to mock data for now to unblock development
  const transcript = await transcriptionEngine.transcribe(Buffer.from('mock audio data'));

  // 3. Interactive Learning
  const learningSession = new LearningSession(transcript);
  learningSession.render();

  // 4. Progress Tracking
  const userStateService = new UserStateService();
  await userStateService.saveTranscript(transcript);
}

main();