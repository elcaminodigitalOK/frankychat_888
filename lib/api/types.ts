// lib/api/types.ts
export interface AIServiceConfig {
    apiKey: string
    model?: string
    baseUrl?: string
  }
  
  export interface AIResponse {
    content: string
    error?: string
  }
  
  export interface AIModel {
    id: string
    name: string
    provider: string
    maxTokens?: number
  }