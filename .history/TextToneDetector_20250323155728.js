import SentimentModel from './models/SentimentModel.js';
import MetaphorUtils from './utils/MetaphorUtils.js';
import EmojiUtils from './utils/EmojiUtils.js';

/**
 * Main class for text tone detection
 */
class TextToneDetector {
  constructor() {
    console.log('TextToneDetector constructor called');
    
    // Initialize components
    this.sentimentModel = new SentimentModel();
    this.metaphorUtils = new MetaphorUtils();
    this.emojiUtils = new EmojiUtils();
    
    // Model loading status
    this.isModelLoaded = false;
    
    // Initialize model
    this.initializeModel();
  }

  async initializeModel() {
    try {
      console.log('TextToneDetector: Initializing sentiment model');
      await this.sentimentModel.initialize();
      this.isModelLoaded = true;
      
      console.log('TextToneDetector: Model loaded successfully');
      
      // Hide loader when model is loaded
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none';
        console.log('Loader hidden');
      } else {
        console.warn('Loader element not found');
      }
      
      // Enable analyze button
      const analyzeBtn = document.getElementById('analyze-btn');
      if (analyzeBtn) {
        analyzeBtn.disabled = false;
        console.log('Analyze button enabled');
      } else {
        console.warn('Analyze button not found');
      }
    } catch (error) {
      console.error('Error initializing model:', error);
      
      // Show error in the UI
      const loader = document.getElementById('loader');
      if (loader) {
        loader.innerHTML = `
          <div class="error">
            <p>Error loading model: ${error.message}</p>
            <p>Please refresh the page to try again.</p>
          </div>
        `;
      }
    }
  }

  // Analyze text and return tone with emojis
  async analyze(text) {
    if (!this.isModelLoaded) {
      return {
        originalText: text,
        tone: 'unknown',
        toneEmoji: '',
        metaphor: null,
        metaphorEmoji: '',
        enhancedText: text
      };
    }

    try {
      // Split text into paragraphs
      const paragraphs = text.split(/\n+/);
      let enhancedParagraphs = [];
      
      for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p];
        const isLastParagraph = p === paragraphs.length - 1;
        
        if (!paragraph.trim()) {
          enhancedParagraphs.push('');
          continue;
        }
        
        // Split paragraph into sentences
        // This regex matches both sentences ending with punctuation and text without punctuation at the end
        const sentences = paragraph.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [paragraph];
        let enhancedParagraph = '';
        
        for (let s = 0; s < sentences.length; s++) {
          const sentence = sentences[s];
          const isLastSentence = isLastParagraph && s === sentences.length - 1;
          
          // Get sentiment from model for each sentence
          const sentimentOutput = await this.sentimentModel.analyze(sentence);
          
          // Determine tone based on model output
          let tone;
          if (sentimentOutput.label === 'POSITIVE') {
            tone = 'positive';
          } else if (sentimentOutput.label === 'NEGATIVE') {
            tone = 'negative';
          } else {
            tone = 'neutral';
          }
          
          // Find metaphors in sentence
          const words = sentence.toLowerCase().split(/\s+/);
          const metaphor = this.metaphorUtils.findMetaphor(words);
          
          // Get emojis for tone and metaphor
          const toneEmoji = this.emojiUtils.getToneEmoji(tone);
          const metaphorEmoji = this.emojiUtils.getMetaphorEmoji(metaphor);
          
          // Add emoji after the sentence's ending punctuation but before any trailing space
          const emojiString = toneEmoji + (metaphorEmoji ? ` ${metaphorEmoji}` : '');
          
          let enhancedSentence;
          // Check if the sentence has ending punctuation
          if (sentence.match(/[.!?]+(\s|$)/)) {
            // This regex captures the end punctuation and any trailing space
            enhancedSentence = sentence.replace(/([.!?]+)(\s|$)/, `$1 ${emojiString}$2`);
          } else if (isLastSentence) {
            // If it's the last sentence and has no punctuation, add emoji after the last word
            enhancedSentence = sentence.trim() + ` ${emojiString}`;
          } else {
            enhancedSentence = sentence;
          }
          
          enhancedParagraph += enhancedSentence;
        }
        
        enhancedParagraphs.push(enhancedParagraph);
      }
      
      const enhancedText = enhancedParagraphs.join('\n');
      
      // For the overall tone and metaphor, analyze the complete text
      const overallSentimentOutput = await this.sentimentModel.analyze(text);
      let overallTone;
      if (overallSentimentOutput.label === 'POSITIVE') {
        overallTone = 'positive';
      } else if (overallSentimentOutput.label === 'NEGATIVE') {
        overallTone = 'negative';
      } else {
        overallTone = 'neutral';
      }
      
      const words = text.toLowerCase().split(/\s+/);
      const overallMetaphor = this.metaphorUtils.findMetaphor(words);
      
      const toneEmoji = this.emojiUtils.getToneEmoji(overallTone);
      const metaphorEmoji = this.emojiUtils.getMetaphorEmoji(overallMetaphor);
      
      return {
        originalText: text,
        tone: overallTone,
        toneEmoji: toneEmoji,
        metaphor: overallMetaphor,
        metaphorEmoji: metaphorEmoji,
        enhancedText: enhancedText
      };
    } catch (error) {
      console.error('Error analyzing text:', error);
      return {
        originalText: text,
        tone: 'error',
        toneEmoji: '❓',
        metaphor: null,
        metaphorEmoji: '',
        enhancedText: text + ' ❓'
      };
    }
  }
}

export default TextToneDetector;