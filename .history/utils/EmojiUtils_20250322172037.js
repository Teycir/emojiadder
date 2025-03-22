/**
 * Provides emoji-related functionality
 */
class EmojiUtils {
    constructor() {
      // Metaphor emoji mappings
      this.metaphorEmojis = {
        speed: ['🚀', '⚡', '💨', '🏃‍♂️'],
        strength: ['💪', '🦾', '🦁', '🐂'],
        growth: ['🌱', '🌳', '📈', '⬆️'],
        time: ['⏰', '⌛', '🕒', '📅'],
        money: ['💰', '💵', '💸', '💲'],
        success: ['🏆', '🥇', '🎖️', '🔝'],
        failure: ['👎', '📉', '❌', '💥'],
        idea: ['💡', '✨', '🧠', '🤔'],
        communication: ['💬', '📣', '📱', '✉️'],
        love: ['❤️', '💕', '💘', '🌹'],
        journey: ['🛣️', '🧭', '🧳', '🚶‍♂️'],
        competition: ['🏁', '🥊', '⚔️', '🎯'],
        health: ['🏥', '💊', '🩺', '🫀'],
        technology: ['📱', '💻', '🤖', '⚙️'],
        education: ['📚', '🎓', '✏️', '🧮'],
        nature: ['🌿', '🌳', '🌊', '🏔️'],
        celebration: ['🎉', '🎊', '🥂', '🎈']
      };
  
      // Tone emoji mappings
      this.toneEmojis = {
        positive: ['😊', '😄', '🥰', '✨', '👍', '🙌'],
        neutral: ['😐', '🤔', '🧐', '📝', '🔍', '💭'],
        negative: ['😔', '😢', '😞', '😠', '👎', '💔']
      };
    }
  
    /**
     * Get random emoji from a list
     * @param {Array} emojiList - List of emojis to choose from
     * @returns {string} - Random emoji
     */
    getRandomEmoji(emojiList) {
      if (!emojiList || emojiList.length === 0) {
        return '';
      }
      const randomIndex = Math.floor(Math.random() * emojiList.length);
      return emojiList[randomIndex];
    }
    
    /**
     * Get emoji for a tone
     * @param {string} tone - Tone to get emoji for
     * @returns {string} - Emoji
     */
    getToneEmoji(tone) {
      return this.getRandomEmoji(this.toneEmojis[tone] || []);
    }
    
    /**
     * Get emoji for a metaphor
     * @param {string} metaphor - Metaphor to get emoji for
     * @returns {string} - Emoji
     */
    getMetaphorEmoji(metaphor) {
      return metaphor ? this.getRandomEmoji(this.metaphorEmojis[metaphor] || []) : '';
    }
  }
  
  export default EmojiUtils;