import { MediaProvider } from './provider';
import { YouTubeProvider } from './youtube-provider';
import { LocalFileProvider } from './local-file-provider';

export function createMediaProvider(source: string): MediaProvider {
  if (source.startsWith('http')) {
    // A more robust check would be needed here to differentiate between YouTube, podcasts, etc.
    return new YouTubeProvider();
  } else {
    return new LocalFileProvider();
  }
}
