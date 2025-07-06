import { MediaProvider } from './provider';
import { EnrichedTranscript } from '../types';
// import * as ytdl from 'ytdl-core'; // Temporarily commented out

export class YouTubeProvider implements MediaProvider {
  async ingest(url: string): Promise<EnrichedTranscript> {
    console.log(`Ingesting from YouTube: ${url} (using mock data due to ytdl-core issue)`);
    // const videoInfo = await ytdl.getInfo(url);
    // const { title, videoId } = videoInfo.videoDetails;

    // console.log(`Fetched video: ${title}`);

    return {
      id: 'mock-youtube-id',
      sourceMedia: {
        type: 'youtube',
        url: url,
      },
      languages: {
        source: 'en', // Assuming English for now
        target: 'en',
      },
      segments: [],
      userProfile: {
        knownVocabulary: new Set(),
      },
    } as EnrichedTranscript;
  }
}
