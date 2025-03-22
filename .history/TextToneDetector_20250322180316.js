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
    
    // Initialize model with a slight delay to ensure DOM is ready
    setTimeout(() => {
      console.log('Starting model initialization after delay');
      this.initializeModel();
    }, 100);
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