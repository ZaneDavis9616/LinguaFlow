import React, { useState } from 'react';
import './App.css';
import { EnrichedTranscript } from '../../src/types'; // Import from our core types

interface WordToken {
  word: string;
  definition: string;
  partOfSpeech: string;
}

interface Segment {
  id: string;
  startTime: number;
  endTime: number;
  textSource: string;
  textTarget: string;
  phoneticTranscription?: string;
  tokens: ReadonlyArray<WordToken>;
  userAttempt?: {
    recordingUrl: string;
    pronunciationScore: number;
    timestamp: Date;
  };
}

function App() {
  const [selectedWord, setSelectedWord] = useState<WordToken | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<EnrichedTranscript>({
    id: 'mock-client-transcript',
    sourceMedia: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=client-mock'
    },
    languages: {
      source: 'en',
      target: 'en'
    },
    segments: [
      {
        id: 'seg-client-1',
        startTime: 0,
        endTime: 5,
        textSource: 'Hello from React client! This is a test sentence.',
        textTarget: 'Hello from React client! This is a test sentence.',
        tokens: [
          { word: 'Hello', definition: 'A greeting', partOfSpeech: 'interjection' },
          { word: 'from', definition: 'Indicating the point of origin', partOfSpeech: 'preposition' },
          { word: 'React', definition: 'A JavaScript library for building user interfaces', partOfSpeech: 'noun' },
          { word: 'client!', definition: 'A person or organization using the services of a professional or company', partOfSpeech: 'noun' },
          { word: 'This', definition: 'Used to identify a specific person or thing close at hand', partOfSpeech: 'pronoun' },
          { word: 'is', definition: 'Third person singular present indicative of be', partOfSpeech: 'verb' },
          { word: 'a', definition: 'Used when referring to someone or something for the first time in a text or conversation', partOfSpeech: 'article' },
          { word: 'test', definition: 'A procedure intended to establish the quality, performance, or reliability of something', partOfSpeech: 'noun' },
          { word: 'sentence.', definition: 'A set of words that is complete in itself', partOfSpeech: 'noun' },
        ]
      },
      {
        id: 'seg-client-2',
        startTime: 5,
        endTime: 10,
        textSource: 'Welcome to LinguaFlow, your language learning companion.',
        textTarget: 'Welcome to LinguaFlow, your language learning companion.',
        tokens: [
          { word: 'Welcome', definition: 'An act of greeting someone', partOfSpeech: 'interjection' },
          { word: 'to', definition: 'Expressing motion in the direction of (a particular place)', partOfSpeech: 'preposition' },
          { word: 'LinguaFlow,', definition: 'Our language learning platform', partOfSpeech: 'noun' },
          { word: 'your', definition: 'Belonging to or associated with the person or people that the speaker is addressing', partOfSpeech: 'pronoun' },
          { word: 'language', definition: 'The method of human communication', partOfSpeech: 'noun' },
          { word: 'learning', definition: 'The acquisition of knowledge or skills through study, experience, or being taught', partOfSpeech: 'noun' },
          { word: 'companion.', definition: 'A person or animal with whom one spends a lot of time or with whom one travels', partOfSpeech: 'noun' },
        ]
      },
    ],
    userProfile: {
      knownVocabulary: new Set()
    }
  });

  const handleWordClick = (word: WordToken) => {
    setSelectedWord(word);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Pausing media' : 'Playing media');
  };

  const handleRecord = () => {
    console.log('Simulating recording...');
    // Simulate a random pronunciation score
    const score = Math.floor(Math.random() * 100) + 1;
    const updatedSegments = transcript.segments.map(s => {
      if (s.id === 'seg-client-1') { // Apply to a specific segment for demonstration
        return {
          ...s,
          userAttempt: {
            recordingUrl: '/mock/recording.mp3',
            pronunciationScore: score,
            timestamp: new Date(),
          },
        };
      }
      return s;
    });
    setTranscript({ ...transcript, segments: updatedSegments });
    console.log(`Recording complete. Pronunciation score: ${score}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LinguaFlow Client</h1>
        <p>Transcript ID: {transcript.id}</p>
        <p>Source: {transcript.sourceMedia.url}</p>
      </header>
      <main className="App-main">
        <div className="transcript-display">
          {transcript.segments.map((segment: Segment) => (
            <div key={segment.id} className="segment-container">
              <p className="segment">
                <span className="timestamp">[{segment.startTime.toFixed(1)}s] </span>
                {segment.textSource.split(/(\s+)/).map((part, index) => {
                  const token = segment.tokens.find(t => t.word === part.replace(/[^a-zA-Z0-9]/g, ''));
                  return token ? (
                    <span
                      key={index}
                      className={`word ${selectedWord?.word === token.word ? 'highlighted' : ''}`}
                      onClick={() => handleWordClick(token)}
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  );
                })}
              </p>
              {segment.userAttempt && (
                <div className="user-attempt">
                  <span>Your score: {segment.userAttempt.pronunciationScore}</span>
                  <button>Play your recording</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedWord && (
          <div className="word-details">
            <h2>{selectedWord.word}</h2>
            <p><strong>Definition:</strong> {selectedWord.definition}</p>
            <p><strong>Part of Speech:</strong> {selectedWord.partOfSpeech}</p>
          </div>
        )}
        <div className="controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={handleRecord}>Record</button>
        </div>
      </main>
    </div>
  );
}

export default App;