import { EnrichedTranscript } from '../types';

export class LearningSession {
  private transcript: EnrichedTranscript;

  constructor(transcript: EnrichedTranscript) {
    this.transcript = transcript;
  }

  render() {
    console.log('\n--- Rendering Learning Session UI ---');
    console.log('Transcript ID:', this.transcript.id);
    console.log('Source Media URL:', this.transcript.sourceMedia.url);

    console.log('\nSegments:');
    this.transcript.segments.forEach((segment) => {
      console.log(`[${segment.startTime.toFixed(1)}s - ${segment.endTime.toFixed(1)}s] ${segment.textSource}`);
    });

    console.log('\n--- Simulating User Interaction ---');

    // Simulate clicking on a word
    if (this.transcript.segments.length > 0 && this.transcript.segments[0].tokens.length > 0) {
      const firstToken = this.transcript.segments[0].tokens[0];
      this.handleWordClick(firstToken);
    }

    // Simulate clicking the record button
    this.handleRecordButtonClick();

    console.log('--- End of Learning Session UI Simulation ---\n');
  }

  handleWordClick(wordToken: { word: string; definition: string; partOfSpeech: string; }) {
    console.log(`Simulating: User clicked on word: "${wordToken.word}"`);
    // In a real UI, this would trigger a popup with definition, etc.
    // For now, we'll just log the action.
    const definition = wordToken.definition;
    console.log(`  Definition: ${definition}`);
  }

  handleRecordButtonClick() {
    console.log('Simulating: User clicked the record button.');
    // In a real UI, this would start audio recording.
    // For now, we'll just log the action.
  }
}
