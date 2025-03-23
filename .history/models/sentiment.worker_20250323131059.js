// Web Worker for loading and running the sentiment model
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0/dist/transformers.min.js';

// Store the pipeline instance
let sentimentPipeline = null;

// Handle messages from the main thread
self.onmessage = async function(event) {
  const { type, data } = event.data;
  
  switch (type) {
    case 'initialize':
      try {
        console.log('[Worker] Starting to load sentiment model...');
        
        // Initialize the sentiment analysis pipeline
        sentimentPipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        
        console.log('[Worker] Sentiment model loaded successfully');
        
        // Notify the main thread that the model is ready
        self.postMessage({ type: 'initialized', success: true });
      } catch (error) {
        console.error('[Worker] Error loading model:', error);
        self.postMessage({ 
          type: 'initialized', 
          success: false, 
          error: error.message 
        });
      }
      break;
      
    case 'analyze':
      try {
        if (!sentimentPipeline) {
          throw new Error('Model not loaded yet');
        }
        
        const text = data.text;
        const result = await sentimentPipeline(text);
        
        self.postMessage({ 
          type: 'result', 
          requestId: data.requestId,
          result: result[0]
        });
      } catch (error) {
        console.error('[Worker] Analysis error:', error);
        self.postMessage({ 
          type: 'result', 
          requestId: data.requestId,
          error: error.message 
        });
      }
      break;
  }
};

// Start preloading the model immediately when the worker is instantiated
console.log('[Worker] Worker initialized, preloading model...');
self.postMessage({ type: 'preloading' });

// Begin loading the model right away without waiting for a message
(async function() {
  try {
    console.log('[Worker] Auto-starting model initialization');
    sentimentPipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    console.log('[Worker] Model preloaded successfully');
    self.postMessage({ type: 'initialized', success: true });
  } catch (error) {
    console.error('[Worker] Error preloading model:', error);
    // We don't send an error here as we'll attempt to load again when requested
  }
})();