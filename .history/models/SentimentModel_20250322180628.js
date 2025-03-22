/**
 * Handles sentiment analysis using Transformers.js
 *
 * Using dynamic import to load the Transformers library as a module
 */
class SentimentModel {
  constructor() {
    this.isLoaded = false;
    this.pipeline = null;
    this.transformers = null;
    
    console.log('SentimentModel constructor called');
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    try {
      console.log('Starting to initialize sentiment model');
      
      // Dynamically import the Transformers library
      console.log('Dynamically importing Transformers library...');
      this.transformers = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0/+esm');
      console.log('Transformers library imported successfully');
      
      // Get the pipeline function from the loaded library
      const { pipeline } = this.transformers;
      console.log('Pipeline function retrieved');
      
      // Initialize the sentiment analysis pipeline
      console.log('Loading sentiment analysis model...');
      this.pipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      console.log('Sentiment analysis model loaded successfully');
      
      this.isLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading sentiment model:', error);
      throw error;
    }
  }

  /**
   * Analyze text sentiment
   * @param {string} text - Text to analyze
   * @returns {Object} Sentiment result
   */
  async analyze(text) {
    if (!this.isLoaded) {
      throw new Error('Model not loaded yet');
    }

    try {
      const result = await this.pipeline(text);
      return result[0];
    } catch (error) {
      console.error('Error in sentiment analysis:', error);
      throw error;
    }
  }
}

export default SentimentModel;