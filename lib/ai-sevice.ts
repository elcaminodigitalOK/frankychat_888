interface AIConfig {
    model: string
    apiKey: string
  }
  
  export async function sendMessageToAI(message: string, config: AIConfig) {
    const endpoint = getEndpointForModel(config.model)
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [{ role: 'user', content: message }]
        })
      })
      
      return await response.json()
    } catch (error) {
      console.error('Error calling AI service:', error)
      throw error
    }
  }
  
  function getEndpointForModel(model: string) {
    // Configurar endpoints según el modelo
    const endpoints = {
      'gpt-4': 'https://api.openai.com/v1/chat/completions',
      'gpt-3.5-turbo': 'https://api.openai.com/v1/chat/completions',
      'claude-3': 'https://api.anthropic.com/v1/messages',
      // Añadir más endpoints según sea necesario
    }
    
    return endpoints[model] || endpoints['gpt-3.5-turbo']
  }