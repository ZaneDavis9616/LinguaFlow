import { createMediaProvider } from './index';
import { YouTubeProvider } from './youtube-provider';
import { LocalFileProvider } from './local-file-provider';

describe('createMediaProvider', () => {
  it('should return a YouTubeProvider for a YouTube URL', () => {
    const provider = createMediaProvider('https://www.youtube.com/watch?v=test');
    expect(provider).toBeInstanceOf(YouTubeProvider);
  });

  it('should return a LocalFileProvider for a local file path', () => {
    const provider = createMediaProvider('/path/to/local/file.mp3');
    expect(provider).toBeInstanceOf(LocalFileProvider);
  });
});
