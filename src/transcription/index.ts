import { EnrichedTranscript } from '../types';
import { SpeechClient, protos } from '@google-cloud/speech';

export class TranscriptionEngine {
  private client: SpeechClient;

  constructor() {
    this.client = new SpeechClient();
  }

  async transcribe(audioBuffer: Buffer): Promise<EnrichedTranscript> {
    console.log('Transcribing media stream using Google Cloud Speech-to-Text...');

    const audio = {
      content: audioBuffer.toString('base64'),
    };
    const config: protos.google.cloud.speech.v1.IRecognitionConfig = {
      encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16, // Use enum for encoding
      sampleRateHertz: 44100, // Adjust based on your audio sample rate
      languageCode: 'en-US', // Adjust based on your audio language
      enableWordTimeOffsets: true, // To get word-level timestamps
    };
    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
      audio: audio,
      config: config,
    };

    try {
      const [response] = await this.client.recognize(request);
      const transcription = response.results
        ?.map(result => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join('\n') || '';

      const segments: EnrichedTranscript['segments'] = [];
      let segmentIdCounter = 0;

      response.results?.forEach(result => {
        result.alternatives?.[0]?.words?.forEach(wordInfo => {
          const startTimeSeconds = parseFloat(wordInfo.startTime?.seconds?.toString() || '0');
          const startTimeNanos = parseFloat(wordInfo.startTime?.nanos?.toString() || '0');
          const endTimeSeconds = parseFloat(wordInfo.endTime?.seconds?.toString() || '0');
          const endTimeNanos = parseFloat(wordInfo.endTime?.nanos?.toString() || '0');

          segments.push({
            id: `seg-${segmentIdCounter++}`,
            startTime: startTimeSeconds + startTimeNanos / 1e9,
            endTime: endTimeSeconds + endTimeNanos / 1e9,
            textSource: wordInfo.word || '',
            textTarget: wordInfo.word || '', // For simplicity, target is same as source for now
            tokens: [
              {
                word: wordInfo.word || '',
                definition: `Definition of ${wordInfo.word || ''}`,
                partOfSpeech: 'unknown'
              }
            ]
          });
        });
      });

      return {
        id: 'google-cloud-transcript',
        sourceMedia: {
          type: 'local', // Default to 'local' or a more appropriate type
          url: 'unknown'
        },
        languages: {
          source: config.languageCode || 'en-US',
          target: config.languageCode || 'en-US'
        },
        segments: segments,
        userProfile: {
          knownVocabulary: new Set()
        }
      } as EnrichedTranscript;
    } catch (error) {
      console.error('Google Cloud Speech-to-Text API error:', error);
      // Fallback to mock data in case of API error
      return {
        id: 'mock-transcript-from-stt',
        sourceMedia: {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=mock-video'
        },
        languages: {
          source: 'en',
          target: 'en'
        },
        segments: [
          {
            id: 'seg-0',
            startTime: 0,
            endTime: 5,
            textSource: 'Mock transcription due to API error.',
            textTarget: 'Mock transcription due to API error.',
            tokens: [
              {
                word: 'Mock',
                definition: 'A simulated object',
                partOfSpeech: 'noun'
              }
            ]
          }
        ],
        userProfile: {
          knownVocabulary: new Set()
        }
      } as EnrichedTranscript;
    }
  }
}