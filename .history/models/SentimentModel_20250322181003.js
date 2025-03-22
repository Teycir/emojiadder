/**
 * Handles sentiment analysis using Transformers.js
 */
class SentimentModel {
  constructor() {
    this.isLoaded = false;
    this.pipeline = null;
    
    console.log('SentimentModel constructor called');
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    return new Promise((resolve, reject) => {
      try {
        console.log('Starting to initialize sentiment model');
        
        // Use the global initialization system to ensure Transformers is loaded
        window.AppInit.registerCallback(async () => {
          try {
            console.log('Transformers is ready, initializing sentiment model');
            
            // Get the pipeline function from the loaded library
            const { pipeline } = window.Transformers;
            console.log('Pipeline function retrieved');
            
            // Initialize the sentiment analysis pipeline
            console.log('Loading sentiment analysis model...');
            this.pipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
            console.log('Sentiment analysis model loaded successfully');
            
            this.isLoaded = true;
            resolve(true);
          } catch (innerError) {
            console.error('Error in Transformers callback:', innerError);
            reject(innerError);
          }
        });
      } catch (error) {
        console.error('Error registering callback:', error);
        reject(error);
      }
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