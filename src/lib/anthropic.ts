// src/lib/anthropic.ts - Open-source stub: Mock for key-free dev/forks, swap real SDK later
// No bloat: Runs without API keys, empowers iteration without vendor lock

export const anthropic = {
  messages: {
    create: async (options: any) => {
      // Mock response for open-source/build - simulate Claude chain-of-thought
      console.log('Anthropic mock: Processing query', options.messages[0].content)
      
      // Stub JSON based on intent (expand for more cases in forks)
      if (options.messages[0].content.includes('Classify')) {
        return { content: [{ text: JSON.stringify({ intent: 'create_opportunity', confidence: 0.95 }) }] }
      }
      if (options.messages[0].content.includes('Extract params')) {
        return { content: [{ text: JSON.stringify({ name: 'Mock Opp', value: 50000, probability: 75 }) }] }
      }
      
      // Fallback mock
      return { content: [{ text: JSON.stringify({ mock: true, result: 'Stubbed response - fork to extend' }) }] }
    }
  }
}