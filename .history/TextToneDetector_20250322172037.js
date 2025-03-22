import SentimentModel from './models/SentimentModel.js';
import MetaphorUtils from './utils/MetaphorUtils.js';
import EmojiUtils from './utils/EmojiUtils.js';

/**
 * Main class for text tone detection
 */
class TextToneDetector {
  constructor() {
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
      await this.sentimentModel.initialize();
      this.isModelLoaded = true;
      
      // Hide loader when model is loaded
      document.getElementById('loader').style.display = 'none';
      
      // Enable analyze button
      document.getElementById('analyze-btn').disabled = false;
    } catch (error) {
      console.error('Error initializing model:', error);
      alert('Failed to load the sentiment analysis model. Please check your connection and try again.');
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
      // Get sentiment from model
      const sentimentOutput = await this.sentimentModel.analyze(text);
      
      // Determine tone based on model output
      let tone;
      if (sentimentOutput.label === 'POSITIVE') {
        tone = 'positive';
      } else if (sentimentOutput.label === 'NEGATIVE') {
        tone = 'negative';
      } else {
        tone = 'neutral';
      }
      
      // Find metaphors
      const words = text.toLowerCase().split(/\s+/);
      const metaphor = this.metaphorUtils.findMetaphor(words);
      
      // Get emojis for tone and metaphor
      const toneEmoji = this.emojiUtils.getToneEmoji(tone);
      const metaphorEmoji = this.emojiUtils.getMetaphorEmoji(metaphor);
      
      return {
        originalText: text,
        tone: tone,
        toneEmoji: toneEmoji,
        metaphor: metaphor,
        metaphorEmoji: metaphorEmoji,
        enhancedText: `${text} ${toneEmoji} ${metaphorEmoji}`.trim()
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