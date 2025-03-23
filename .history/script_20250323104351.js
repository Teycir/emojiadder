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

  // Function to count words in a text
  function countWords(text) {
    return text.trim().split(/\\s+/).filter(word => word.length > 0).length;
  }

  // Function to show word limit popup
  function showWordLimitPopup() {
    const popup = document.createElement('div');
    popup.className = 'word-limit-popup';
    popup.innerHTML = '<div class="popup-content"><p>Text exceeds the 3000 word limit!</p><button class="close-popup">OK</button></div>';
    document.body.appendChild(popup);
    
    document.querySelector('.close-popup').addEventListener('click', function() {
      popup.remove();
    });
  }

  // Analyze text function
  async function analyzeText() {
    const text = textInput.value.trim();
    
    if (!text) {
      alert('Please enter some text to analyze.');
      return;
    }
    
    // Check if text exceeds 3000 words
    const wordCount = countWords(text);
    if (wordCount > 3000) {
      showWordLimitPopup();
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
