import { TranscriptionEngine } from './index';
import { SpeechClient } from '@google-cloud/speech';

jest.mock('@google-cloud/speech'); // Mock the SpeechClient

const MockSpeechClient = SpeechClient as jest.MockedClass<typeof SpeechClient>;

describe('TranscriptionEngine', () => {
  let mockRecognize: jest.Mock;

  beforeEach(() => {
    mockRecognize = jest.fn().mockResolvedValue([
      {
        results: [
          {
            alternatives: [
              {
                transcript: 'Hello world',
                words: [
                  { word: 'Hello', startTime: { seconds: 0, nanos: 0 }, endTime: { seconds: 0, nanos: 500000000 } },
                  { word: 'world', startTime: { seconds: 0, nanos: 500000000 }, endTime: { seconds: 1, nanos: 0 } },
                ],
              },
            ],
          },
        ],
      },
    ]);
    MockSpeechClient.mockImplementation(() => {
      return {
        recognize: mockRecognize,
        // Mock other methods if needed by the TranscriptionEngine constructor or other methods
      } as unknown as SpeechClient; // Type assertion to satisfy TypeScript
    });
  });

  it('should transcribe a media stream and return an EnrichedTranscript', async () => {
    const engine = new TranscriptionEngine();
    const mockMediaStream = Buffer.from('mock audio data'); // Mock media stream as Buffer
    const transcript = await engine.transcribe(mockMediaStream);

    expect(transcript).toBeDefined();
    expect(transcript.id).toBe('google-cloud-transcript');
    expect(transcript.segments.length).toBeGreaterThan(0);
    expect(transcript.segments[0].textSource).toBeDefined();
    expect(mockRecognize).toHaveBeenCalledTimes(1);
  });
});