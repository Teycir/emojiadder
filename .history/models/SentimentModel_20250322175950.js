/**
 * Handles sentiment analysis using Transformers.js
 *
 * Note: We need to access the global Transformers object differently in ES modules
 * and wait for the library to load before accessing it
 */
class SentimentModel {
  constructor() {
    this.isLoaded = false;
    this.pipeline = null;
    
    // Ensure the Transformers library is loaded
    if (typeof window.Transformers === 'undefined') {
      console.log('Transformers not immediately available, waiting for script to load...');
    }
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    try {
      // Wait for the Transformers library to be loaded
      await this.waitForTransformers();
      
      console.log('Transformers library loaded successfully');
      
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
   * Wait for the Transformers library to be loaded
   * @returns {Promise} Resolves when Transformers is available
   */
  waitForTransformers() {
    return new Promise((resolve, reject) => {
      // If Transformers is already available, resolve immediately
      if (window.Transformers) {
        console.log('Transformers already available');
        return resolve();
      }
      
      console.log('Waiting for Transformers to load...');
      
      // Check every 100ms if Transformers is loaded
      const maxAttempts = 100; // 10 seconds max
      let attempts = 0;
      
      const checkInterval = setInterval(() => {
        attempts++;
        
        if (window.Transformers) {
          clearInterval(checkInterval);
          console.log(`Transformers found after ${attempts} attempts`);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(new Error('Transformers library not loaded after timeout. Make sure the script is included in your HTML.'));
        }
      }, 100);
    });
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