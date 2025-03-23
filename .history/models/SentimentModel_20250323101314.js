// Import the pipeline directly from the Transformers library
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0/dist/transformers.min.js';

/**
 * Handles sentiment analysis using Transformers.js
 * Implements caching to avoid reloading the model
 */
class SentimentModel {
  // Static properties for caching
  static instance = null;
  static pipelineInstance = null;
  static isInitializing = false;
  static initPromise = null;

  constructor() {
    this.isLoaded = SentimentModel.pipelineInstance !== null;
    this.pipeline = SentimentModel.pipelineInstance;
    
    console.log('SentimentModel constructor called, cached:', this.isLoaded);
    
    // Return existing instance if available
    if (SentimentModel.instance) {
      console.log('Returning cached SentimentModel instance');
      return SentimentModel.instance;
    }
    
    // Store this instance as the singleton
    SentimentModel.instance = this;
  }

  /**
   * Initialize the sentiment analysis model
   * @returns {Promise} Resolves when model is loaded
   */
  async initialize() {
    // If model is already loaded, return immediately
    if (this.isLoaded) {
      console.log('Model already loaded, using cached instance');
      return Promise.resolve(true);
    }
    
    // If initialization is in progress, return the existing promise
    if (SentimentModel.isInitializing) {
      console.log('Model initialization already in progress, waiting...');
      return SentimentModel.initPromise;
    }
    
    // Create a new initialization promise
    SentimentModel.isInitializing = true;
    SentimentModel.initPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('Starting to initialize sentiment model');
        
        try {
          console.log('Initializing sentiment model');
          
          // Initialize the sentiment analysis pipeline
          console.log('Loading sentiment analysis model...');
          SentimentModel.pipelineInstance = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
          console.log('Sentiment analysis model loaded successfully');
          
          // Update instance properties
          this.pipeline = SentimentModel.pipelineInstance;
          this.isLoaded = true;
          
          resolve(true);
        } catch (innerError) {
          console.error('Error in Transformers initialization:', innerError);
          SentimentModel.isInitializing = false;
          reject(innerError);
        }
      } catch (error) {
        console.error('Error initializing model:', error);
        SentimentModel.isInitializing = false;
        reject(error);
      }
    });
    
    return SentimentModel.initPromise;
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