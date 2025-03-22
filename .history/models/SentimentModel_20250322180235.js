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
    
    console.log('SentimentModel constructor called');
    // Check if transformersLoaded flag exists
    if (window.transformersLoaded) {
      console.log('Transformers already loaded according to global flag');
    } else {
      console.log('Waiting for Transformers to load (global flag not set)');
    }
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    try {
      console.log('Starting to initialize sentiment model');
      // Wait for the Transformers library to be loaded
      await this.waitForTransformers();
      
      console.log('Transformers library loaded successfully');
      
      // Get the pipeline function from the loaded library
      const { pipeline } = window.Transformers;
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
   * Wait for the Transformers library to be loaded
   * @returns {Promise} Resolves when Transformers is available
   */
  waitForTransformers() {
    return new Promise((resolve, reject) => {
      // First check the global flag
      if (window.transformersLoaded && window.Transformers) {
        console.log('Transformers already available (global flag is set)');
        return resolve();
      }
      
      // If Transformers is already available but flag not set, resolve immediately
      if (window.Transformers) {
        console.log('Transformers already available (object exists)');
        return resolve();
      }
      
      console.log('Waiting for Transformers to load...');
      
      // Check every 100ms if Transformers is loaded
      const maxAttempts = 200; // 20 seconds max
      let attempts = 0;
      
      const checkInterval = setInterval(() => {
        attempts++;
        
        // Check both the flag and the object
        if (window.transformersLoaded && window.Transformers) {
          clearInterval(checkInterval);
          console.log(`Transformers found after ${attempts} attempts (flag is set)`);
          resolve();
        } else if (window.Transformers) {
          clearInterval(checkInterval);
          console.log(`Transformers found after ${attempts} attempts (object exists)`);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.error('Transformers library not loaded after timeout');
          reject(new Error('Transformers library not loaded after timeout. Make sure the script is included in your HTML.'));
        }
        
        if (attempts % 10 === 0) {
          console.log(`Still waiting for Transformers... (attempt ${attempts}/${maxAttempts})`);
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