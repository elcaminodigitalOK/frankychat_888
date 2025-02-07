"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAIStore } from '@/lib/store'

const AI_PROVIDERS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'mistral', label: 'Mistral AI' },
  { value: 'groq', label: 'Groq' },
  { value: 'perplexity', label: 'Perplexity' }
]

export function AISelector() {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isApiKeyValid, setIsApiKeyValid] = useState(false)
  const { setModel, setApiKey: storeSetApiKey } = useAIStore()

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(e.target.value)
    setIsApiKeyValid(false)
  }

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value
    setApiKey(key)
    // Validación básica de API key
    setIsApiKeyValid(key.length > 20)
  }

  const handleSubmit = () => {
    if (!selectedProvider || !apiKey || !isApiKeyValid) return
    storeSetApiKey(apiKey)
    setModel(selectedProvider)
    router.push('/chat') // O la ruta que uses para la interfaz de chat
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <div className="relative w-full">
        <select
          value={selectedProvider}
          onChange={handleProviderChange}
          className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white appearance-none cursor-pointer focus:outline-none focus:border-green-500"
        >
          <option value="" disabled>Seleccionar IA</option>
          {AI_PROVIDERS.map((provider) => (
            <option key={provider.value} value={provider.value}>
              {provider.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="relative w-full">
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Introducir API KEY"
          className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white appearance-none focus:outline-none focus:border-green-500"
        />
        {isApiKeyValid && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedProvider || !isApiKeyValid}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Comenzar
      </button>
    </div>
  )
}