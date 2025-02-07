// lib/ai-service.ts
type Provider = 'openai' | 'anthropic' | 'gemini' | 'mistral' | 'groq' | 
                'huggingface' | 'openrouter' | 'deepseek' | 'cohere' | 
                'perplexity' | 'xai' | 'bedrock'

interface AIConfig {
  model: string
  apiKey: string
}

interface AIResponse {
  content: string
  error?: string
}

const PROVIDER_ENDPOINTS: Record<Provider, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages',
  gemini: 'https://generativelanguage.googleapis.com/v1/models',
  mistral: 'https://api.mistral.ai/v1/chat/completions',
  groq: 'https://api.groq.com/v1/chat/completions',
  huggingface: 'https://api-inference.huggingface.co/models',
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  deepseek: 'https://api.deepseek.ai/v1/chat/completions',
  cohere: 'https://api.cohere.ai/v1/generate',
  perplexity: 'https://api.perplexity.ai/chat/completions',
  xai: 'https://api.xai.com/v1/chat/completions',
  bedrock: 'https://bedrock-runtime.amazonaws.com/model/invoke'
}

export async function sendMessageToAI(message: string, config: AIConfig): Promise<AIResponse> {
  const provider = getProviderFromModel(config.model) as Provider
  
  try {
    const endpoint = PROVIDER_ENDPOINTS[provider]
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
    
    const data = await response.json()
    return {
      content: data.choices?.[0]?.message?.content || data.output || ''
    }
  } catch (error) {
    console.error('Error calling AI service:', error)
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

function getProviderFromModel(model: string): Provider {
  if (model.includes('gpt')) return 'openai'
  if (model.includes('claude')) return 'anthropic'
  if (model.includes('gemini')) return 'gemini'
  if (model.includes('mistral')) return 'mistral'
  // Añadir más casos según sea necesario
  return 'openai' // Proveedor por defecto
}