/**
 * Utilities for detecting metaphors in text
 */
class MetaphorUtils {
    constructor() {
      // Metaphorical concept mappings
      this.metaphorKeywords = {
        speed: ['fast', 'quick', 'rapid', 'swift', 'hurry', 'race', 'dash', 'speed', 'accelerate'],
        strength: ['strong', 'powerful', 'mighty', 'solid', 'tough', 'force', 'muscle'],
        growth: ['grow', 'expand', 'rise', 'develop', 'evolve', 'progress', 'advance', 'improve'],
        time: ['minute', 'hour', 'day', 'week', 'month', 'year', 'time', 'deadline', 'schedule'],
        money: ['dollar', 'cash', 'currency', 'finance', 'wealth', 'economy', 'invest', 'profit'],
        success: ['win', 'achieve', 'victory', 'triumph', 'accomplish', 'excel', 'succeed'],
        failure: ['fail', 'lose', 'defeat', 'loss', 'unsuccessful', 'flop', 'breakdown'],
        idea: ['think', 'concept', 'notion', 'plan', 'brain', 'mind', 'thought', 'idea', 'imagine'],
        communication: ['talk', 'speak', 'chat', 'message', 'call', 'discuss', 'conversation'],
        love: ['love', 'romance', 'passion', 'affection', 'heart', 'adore', 'cherish'],
        journey: ['travel', 'trip', 'adventure', 'expedition', 'quest', 'voyage', 'trek', 'journey'],
        competition: ['compete', 'contest', 'race', 'opponent', 'rival', 'challenge', 'competition'],
        health: ['healthy', 'wellness', 'fitness', 'medical', 'doctor', 'hospital', 'health'],
        technology: ['tech', 'digital', 'computer', 'internet', 'software', 'hardware', 'technology'],
        education: ['learn', 'study', 'school', 'college', 'university', 'teach', 'education'],
        nature: ['natural', 'environment', 'earth', 'forest', 'mountain', 'river', 'ocean', 'nature'],
        celebration: ['party', 'celebrate', 'festival', 'holiday', 'event', 'birthday', 'celebration']
      };
    }
  
    /**
     * Find metaphorical concept in text
     * @param {Array} words - Array of words to analyze
     * @returns {string|null} - Detected metaphor or null
     */
    findMetaphor(words) {
      const matches = {};
      
      // Count occurrences of metaphorical keywords
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?;:]/g, '');
        
        for (const concept in this.metaphorKeywords) {
          if (this.metaphorKeywords[concept].includes(cleanWord)) {
            matches[concept] = (matches[concept] || 0) + 1;
          }
        }
      });
      
      // Find concept with most matches
      let topConcept = null;
      let maxMatches = 0;
      
      for (const concept in matches) {
        if (matches[concept] > maxMatches) {
          maxMatches = matches[concept];
          topConcept = concept;
        }
      }
      
      return topConcept;
    }
  }
  
  export default MetaphorUtils;