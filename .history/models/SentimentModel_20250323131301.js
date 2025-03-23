/**
 * Handles sentiment analysis using Transformers.js via Web Worker
 * Implements caching and background loading to improve performance
 */
class SentimentModel {
  // Static properties for caching
  static instance = null;
  static worker = null;
  static isInitializing = false;
  static initPromise = null;
  static requestCounter = 0;
  static pendingRequests = new Map();

  constructor() {
    console.log('SentimentModel constructor called');
    
    // Return existing instance if available
    if (SentimentModel.instance) {
      console.log('Returning cached SentimentModel instance');
      return SentimentModel.instance;
    }
    
    this.isLoaded = false;
    
    // Store this instance as the singleton
    SentimentModel.instance = this;
    
    // Initialize worker if not already created
    if (!SentimentModel.worker) {
      this._initWorker();
    }
  }
  
  /**
   * Initialize the Web Worker
   * @private
   */
  _initWorker() {
    console.log('Creating sentiment model worker');
    
    // Create a new worker
    SentimentModel.worker = new Worker('./models/sentiment.worker.js', { type: 'module' });
    
    // Set up message handler
    SentimentModel.worker.onmessage = (event) => {
      const { type, requestId, result, success, error } = event.data;
      
      switch (type) {
        case 'preloading':
          console.log('Model preloading started in worker');
          break;
          
        case 'initialized':
          console.log('Model initialization complete, success:', success);
          if (success) {
            this.isLoaded = true;
            if (SentimentModel.initPromise) {
              SentimentModel.isInitializing = false;
              SentimentModel.initPromise.resolve(true);
            }
          } else {
            if (SentimentModel.initPromise) {
              SentimentModel.isInitializing = false;
              SentimentModel.initPromise.reject(new Error(error || 'Model initialization failed'));
            }
          }
          break;
          
        case 'result':
          // Resolve the pending promise for this request
          const pendingRequest = SentimentModel.pendingRequests.get(requestId);
          if (pendingRequest) {
            if (error) {
              pendingRequest.reject(new Error(error));
            } else {
              pendingRequest.resolve(result);
            }
            SentimentModel.pendingRequests.delete(requestId);
          }
          break;
      }
    };
    
    // Handle worker errors
    SentimentModel.worker.onerror = (error) => {
      console.error('Worker error:', error);
      if (SentimentModel.initPromise && SentimentModel.isInitializing) {
        SentimentModel.isInitializing = false;
        SentimentModel.initPromise.reject(error);
      }
    };
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
    
    let promiseResolve, promiseReject;
    SentimentModel.initPromise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    
    // Store resolvers in the promise
    SentimentModel.initPromise.resolve = promiseResolve;
    SentimentModel.initPromise.reject = promiseReject;
    
    console.log('Requesting model initialization from worker');
    SentimentModel.worker.postMessage({ type: 'initialize' });
    
    return SentimentModel.initPromise;
  }
  
  /**
   * Analyze text sentiment
   * @param {string} text - Text to analyze
   * @returns {Object} Sentiment result
   */
  async analyze(text) {
    if (!SentimentModel.worker) {
      throw new Error('Worker not initialized');
    }

    // Create a promise for this specific request
    const requestId = ++SentimentModel.requestCounter;
    
    let resolveRequest, rejectRequest;
    const requestPromise = new Promise((resolve, reject) => {
      resolveRequest = resolve;
      rejectRequest = reject;
    });
    
    // Store the promise resolvers
    SentimentModel.pendingRequests.set(requestId, {
      resolve: resolveRequest,
      reject: rejectRequest
    });
    
    // Send the analysis request to the worker
    SentimentModel.worker.postMessage({
      type: 'analyze',
      data: {
        requestId,
        text
      }
    });
    
    return requestPromise;
  }
}

export default SentimentModel;