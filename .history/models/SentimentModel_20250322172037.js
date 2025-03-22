// Import from Transformers.js
const { pipeline } = window.Transformers;

/**
 * Handles sentiment analysis using Transformers.js
 */
class SentimentModel {
  constructor() {
    this.isLoaded = false;
    this.pipeline = null;
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    try {
      this.pipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
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