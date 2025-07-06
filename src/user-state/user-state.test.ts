import { UserStateService } from './index';
import { EnrichedTranscript } from '../types';

describe('UserStateService', () => {
  let service: UserStateService;
  let consoleSpy: jest.SpyInstance;

  const mockTranscript: EnrichedTranscript = {
    id: 'test-transcript-id',
    sourceMedia: { type: 'youtube', url: 'https://test.com' },
    languages: { source: 'en', target: 'en' },
    segments: [],
    userProfile: { knownVocabulary: new Set() }
  };

  beforeEach(() => {
    service = new UserStateService();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should save a transcript', async () => {
    await service.saveTranscript(mockTranscript);
    expect(service.getUserData().savedTranscripts['test-transcript-id']).toEqual(mockTranscript);
    expect(consoleSpy).toHaveBeenCalledWith('Saving transcript to mock user state...');
    expect(consoleSpy).toHaveBeenCalledWith('Transcript saved. Current saved transcripts:', ['test-transcript-id']);
  });

  it('should add a known word', async () => {
    await service.addKnownWord('hello');
    expect(service.getUserData().knownVocabulary.has('hello')).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith('Adding known word: hello to mock user state.');
    expect(consoleSpy).toHaveBeenCalledWith('Current known vocabulary:', ['hello']);
  });

  it('should save a recording', async () => {
    const recordingUrl = 'http://mock.url/recording.mp3';
    await service.saveRecording(recordingUrl);
    expect(service.getUserData().savedRecordings).toContain(recordingUrl);
    expect(consoleSpy).toHaveBeenCalledWith(`Saving recording: ${recordingUrl} to mock user state.`);
    expect(consoleSpy).toHaveBeenCalledWith('Current saved recordings:', [recordingUrl]);
  });
});
