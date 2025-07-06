import { EnrichedTranscript } from '../types';

interface UserData {
  savedTranscripts: { [id: string]: EnrichedTranscript };
  knownVocabulary: Set<string>;
  savedRecordings: string[];
}

export class UserStateService {
  private userData: UserData;

  constructor() {
    // Initialize with empty data or load from a mock persistent store
    this.userData = {
      savedTranscripts: {},
      knownVocabulary: new Set(),
      savedRecordings: [],
    };
  }

  async saveTranscript(transcript: EnrichedTranscript): Promise<void> {
    console.log('Saving transcript to mock user state...');
    this.userData.savedTranscripts[transcript.id] = transcript;
    console.log('Transcript saved. Current saved transcripts:', Object.keys(this.userData.savedTranscripts));
  }

  async addKnownWord(word: string): Promise<void> {
    console.log(`Adding known word: ${word} to mock user state.`);
    this.userData.knownVocabulary.add(word);
    console.log('Current known vocabulary:', Array.from(this.userData.knownVocabulary));
  }

  async saveRecording(recordingUrl: string): Promise<void> {
    console.log(`Saving recording: ${recordingUrl} to mock user state.`);
    this.userData.savedRecordings.push(recordingUrl);
    console.log('Current saved recordings:', this.userData.savedRecordings);
  }

  // Optional: A method to retrieve user data (for demonstration)
  getUserData(): UserData {
    return this.userData;
  }
}