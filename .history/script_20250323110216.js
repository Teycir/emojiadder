import TextToneDetector from './TextToneDetector.js';

// DOM event listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing application');
  
  // DOM elements
  const textInput = document.getElementById('text-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const toneResult = document.getElementById('tone-result');
  const toneEmoji = document.getElementById('tone-emoji');
  const metaphorResult = document.getElementById('metaphor-result');
  const metaphorEmoji = document.getElementById('metaphor-emoji');
  const enhancedTextResult = document.getElementById('enhanced-text-result');
  const exampleBtns = document.querySelectorAll('.example-btn');
  const loader = document.getElementById('loader');

  // Disable analyze button until model loads
  analyzeBtn.disabled = true;
  
  // Make sure the loader is visible
  loader.style.display = 'flex';
  
  // Create detector instance
  console.log('Creating TextToneDetector instance');
  const toneDetector = new TextToneDetector();

  // Add event listener to limit textarea to 200 lines
  textInput.addEventListener('input', function() {
    const lines = this.value.split('\n');
    if (lines.length > 300) {
      this.value = lines.slice(0, 300).join('\n');
    }
  });

  // Analyze text function
  async function analyzeText() {
    const text = textInput.value.trim();
    
    if (!text) {
      alert('Please enter some text to analyze.');
      return;
    }
    
    // Show loading indicator
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
    
    try {
      const result = await toneDetector.analyze(text);
      
      // Display results
      toneResult.textContent = result.tone.charAt(0).toUpperCase() + result.tone.slice(1);
      toneResult.className = result.tone;
      
      toneEmoji.textContent = result.toneEmoji || 'None';
      
      metaphorResult.textContent = result.metaphor 
        ? result.metaphor.charAt(0).toUpperCase() + result.metaphor.slice(1) 
        : 'None detected';
      
      metaphorEmoji.textContent = result.metaphorEmoji || 'None';
      
      enhancedTextResult.textContent = result.enhancedText;
    } catch (error) {
      console.error('Error in analysis:', error);
      enhancedTextResult.textContent = 'An error occurred during analysis. Please try again.';
    } finally {
      // Reset button
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'Analyze Text';
    }
  }

  // Event listeners
  analyzeBtn.addEventListener('click', analyzeText);

  textInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      analyzeText();
    }
  });

  // Example buttons
  exampleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const exampleText = this.getAttribute('data-text');
      textInput.value = exampleText;
      analyzeText();
    });
  });

  // Initial instructions
  enhancedTextResult.textContent = 'Enter text and click "Analyze Text" to see the enhanced result with emojis.';
});
