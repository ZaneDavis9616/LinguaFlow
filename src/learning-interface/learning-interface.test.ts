import { LearningSession } from './index';
import { EnrichedTranscript } from '../types';

describe('LearningSession', () => {
  let consoleSpy: jest.SpyInstance;
  const mockTranscript: EnrichedTranscript = {
    id: 'test-transcript',
    sourceMedia: { type: 'youtube', url: 'https://test.com' },
    languages: { source: 'en', target: 'en' },
    segments: [
      {
        id: 'seg1',
        startTime: 0,
        endTime: 2,
        textSource: 'Hello world',
        textTarget: 'Hello world',
        tokens: [{ word: 'Hello', definition: 'Greeting', partOfSpeech: 'noun' }]
      }
    ],
    userProfile: { knownVocabulary: new Set() }
  };

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should render the learning session UI', () => {
    const session = new LearningSession(mockTranscript);
    session.render();
    expect(consoleSpy).toHaveBeenCalledWith('\n--- Rendering Learning Session UI ---');
    expect(consoleSpy).toHaveBeenCalledWith('Transcript ID:', 'test-transcript');
    expect(consoleSpy).toHaveBeenCalledWith('[0.0s - 2.0s] Hello world');
  });

  it('should handle word click', () => {
    const session = new LearningSession(mockTranscript);
    session.handleWordClick({ word: 'Hello', definition: 'Greeting', partOfSpeech: 'noun' });
    expect(consoleSpy).toHaveBeenCalledWith('Simulating: User clicked on word: "Hello"');
    expect(consoleSpy).toHaveBeenCalledWith('  Definition: Greeting');
  });

  it('should handle record button click', () => {
    const session = new LearningSession(mockTranscript);
    session.handleRecordButtonClick();
    expect(consoleSpy).toHaveBeenCalledWith('Simulating: User clicked the record button.');
  });
});
