/**
 * Handles sentiment analysis using Transformers.js
 */
// We need to access the global Transformers object differently in ES modules
// Wait for the library to load before accessing it
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
      // Access the Transformers library from the global scope
      if (!window.Transformers) {
        throw new Error('Transformers library not loaded. Make sure the script is included in your HTML.');
      }
      
      // Get the pipeline function from the loaded library
      const { pipeline } = window.Transformers;
      
      // Initialize the sentiment analysis pipeline
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