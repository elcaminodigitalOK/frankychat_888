'use client'

import { useState } from 'react'
import { Terminal, FileCode, Server, Box, Send, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAIStore } from '@/lib/store'
import Image from 'next/image'

const AI_PROVIDERS = {
  groq: 'https://console.groq.com/keys',
  openai: 'https://platform.openai.com/api-keys',
  anthropic: 'https://console.anthropic.com/account/keys',
  gemini: 'https://makersuite.google.com/app/apikey',
  mistral: 'https://console.mistral.ai/api-keys',
  perplexity: 'https://www.perplexity.ai/settings/api',
  huggingface: 'https://huggingface.co/settings/tokens',
  cohere: 'https://dashboard.cohere.com/api-keys',
  xai: 'https://api.xai.com/keys'
}

const AI_MODELS = {
  groq: ['LLama-2', 'Claude-2', 'Mixtral'],
  openai: ['GPT-4', 'GPT-3.5', 'GPT-4 Turbo'],
  anthropic: ['Claude-3', 'Claude-2', 'Claude-Instant'],
  gemini: ['Pro', 'Ultra'],
  mistral: ['Mixtral-8x7B', 'Mistral-7B'],
  perplexity: ['Sonar-Medium', 'Sonar-Small'],
  huggingface: ['Llama-2', 'Falcon'],
  cohere: ['Command', 'Command-Light'],
  xai: ['Grok-1']
}

export function HomeInterface() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isApiKeyValid, setIsApiKeyValid] = useState(false)
  const [showModels, setShowModels] = useState(false)
  const [selectedModel, setSelectedModel] = useState('')
  const { setModel, setApiKey: storeSetApiKey } = useAIStore()

  const validateApiKey = (key: string) => {
    if (key.length >= 20) {
      setIsApiKeyValid(true)
      setShowModels(true)
    } else {
      setIsApiKeyValid(false)
      setShowModels(false)
    }
  }

  const handleGetApi = () => {
    if (selectedProvider && AI_PROVIDERS[selectedProvider as keyof typeof AI_PROVIDERS]) {
      window.open(AI_PROVIDERS[selectedProvider as keyof typeof AI_PROVIDERS], '_blank')
    }
  }

  const handleSubmit = () => {
    if (!selectedProvider || !selectedModel || !isApiKeyValid) return
    storeSetApiKey(apiKey)
    setModel(selectedModel)
    router.push('/workspace')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-500" />
          <span className="text-xl font-semibold">franky</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">Ayuda</button>
          <button className="text-gray-400 hover:text-white">Iniciar sesión</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
            Comenzar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          ¿Necesitas ayuda con Linux?
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Pregúntale a Franky sobre comandos Linux, administración de sistemas o desarrollo
        </p>

        <div className="bg-[#111827] rounded-xl p-6 mb-8">
          <div className="relative mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="¿En qué te puede ayudar Franky hoy? Pregunta sobre comandos Linux, configuración de servidores o desarrollo..."
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-4 min-h-[120px] text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500 pr-16"
            />
            <button 
              onClick={handleSubmit}
              className="absolute bottom-4 right-4 p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar IA</option>
                {Object.keys(AI_MODELS).map(provider => (
                  <option key={provider} value={provider}>
                    {provider.toUpperCase()}
                  </option>
                ))}
              </select>

              {showModels && (
                <div className="bg-[#1F2937] border border-gray-700 rounded-xl p-4">
                  <h3 className="text-sm text-gray-400 mb-2">Modelos disponibles:</h3>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#161b22] border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccionar Modelo</option>
                    {AI_MODELS[selectedProvider as keyof typeof AI_MODELS]?.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value)
                      validateApiKey(e.target.value)
                    }}
                    placeholder="Introducir API KEY"
                    className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 pr-24"
                  />
                  {isApiKeyValid && (
                    <button 
                      onClick={handleSubmit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleGetApi}
                  disabled={!selectedProvider}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  GET API
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Terminal, text: "Aprender comandos básicos" },
            { icon: FileCode, text: "Escribir un script shell" },
            { icon: Server, text: "Configurar servicios" },
            { icon: Box, text: "Desplegar aplicaciones" }
          ].map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="flex items-center justify-center gap-2 p-3 bg-[#111827] border border-gray-700 rounded-xl hover:bg-[#1F2937] transition-colors text-sm"
            >
              <Icon className="w-4 h-4" />
              <span>{text}</span>
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-center mb-6">o explora distribuciones populares de Linux</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {['Ubuntu', 'Fedora', 'Debian', 'CentOS', 'Arch', 'RHEL'].map((distro) => (
            <div
              key={distro}
              className="aspect-square bg-[#111827] rounded-xl flex items-center justify-center hover:bg-[#1F2937] transition-colors cursor-pointer"
            >
              <Image
                src={`/logos/${distro.toLowerCase()}.png`}
                alt={distro}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}