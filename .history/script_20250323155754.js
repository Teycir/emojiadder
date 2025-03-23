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
  const initLabel = document.getElementById('init-label');

  // Unlike before, the analyze button remains enabled during model initialization.
  // Remove any loader display code since initialization message is shown as a label.
  
  // Create detector instance
  console.log('Creating TextToneDetector instance');
  const toneDetector = new TextToneDetector();

  // Start model initialization asynchronously.
  // If TextToneDetector provides an initialization method or a ready promise,
  // replace the simulated delay with that. Here we simulate a 3-second initialization delay.
  (async function initModel() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Model initialization is complete.
    initLabel.textContent = "Congratulations, model loaded and cached (will load faster next time)!";
    initLabel.style.transition = "opacity 2s";
    // Fade out the initialization label after 2 seconds.
    setTimeout(() => {
      initLabel.style.opacity = 0;
    }, 2000);
  })();

  // Add event listener to limit textarea to 400 lines and alert if exceeded
  textInput.addEventListener('input', function() {
    const lines = this.value.split('\n');
    if (lines.length > 400) {
      alert("400 max lines allowed!");
      this.value = lines.slice(0, 400).join('\n');
    }
  });

  // Analyze text function
  async function analyzeText() {
    const text = textInput.value.trim();
    
    if (!text) {
      alert('Please enter some text to analyze.');
      return;
    }
    
    // Optionally disable the analyze button during analysis to prevent duplicate clicks.
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
      
      // Get the final metaphor emoji from the UI
      const metaphorEmojiValue = metaphorEmoji.textContent;
      
      // First set the enhanced text from the analysis result
      enhancedTextResult.textContent = result.enhancedText;
      
      // Then make sure metaphor emoji is present at the end if it's valid
      if (metaphorEmojiValue && metaphorEmojiValue !== 'None' && metaphorEmojiValue !== '-') {
        // Find the last occurrence of the tone emoji in the text
        const lastToneIndex = enhancedTextResult.textContent.lastIndexOf(result.toneEmoji);
        
        if (lastToneIndex !== -1 &&
            enhancedTextResult.textContent.indexOf(metaphorEmojiValue, lastToneIndex) === -1) {
          // Split the text at the tone emoji
          const beforeTone = enhancedTextResult.textContent.substring(0, lastToneIndex + result.toneEmoji.length);
          const afterTone = enhancedTextResult.textContent.substring(lastToneIndex + result.toneEmoji.length);
          
          // Insert the metaphor emoji after the tone emoji
          enhancedTextResult.textContent = `${beforeTone} ${metaphorEmojiValue}${afterTone}`;
        }
      }
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

// Function to append the metaphor emoji to the end of the provided text if detected
function appendMetaphorEmoji(text, metaphorEmoji) {
  if (metaphorEmoji && metaphorEmoji.trim() !== '' && metaphorEmoji !== 'None') {
    return text + " " + metaphorEmoji;
  }
  return text;
}
