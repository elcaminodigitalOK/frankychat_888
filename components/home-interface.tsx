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

const DISTRO_INFO = {
  Desktop: {
    Ubuntu: 'Distribución popular basada en Debian, ideal para principiantes',
    LinuxMint: 'Basada en Ubuntu, perfecta para usuarios que migran de Windows',
    Manjaro: 'Basada en Arch, combina potencia con facilidad de uso',
    OpenSUSE: 'Distribución profesional con herramientas únicas de configuración'
  },
  Server: {
    Debian: 'Conocida por su estabilidad y seguridad, ideal para servidores',
    RHEL: 'Red Hat Enterprise Linux, estándar en entornos empresariales',
    CentOS: 'Versión comunitaria de RHEL, popular en servidores',
    Slackware: 'Una de las distribuciones más antiguas, conocida por su simplicidad'
  },
  Security: {
    Kali: 'Especializada en pruebas de penetración y seguridad informática',
    Parrot: 'Suite completa de herramientas para seguridad, desarrollo y privacidad'
  },
  Advanced: {
    Arch: 'Distribución minimalista y altamente personalizable'
  }
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
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <header className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
            Franky
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            Documentación
          </button>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            Iniciar sesión
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors">
            Comenzar gratis
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Tu Experto en Linux Personal
          </h1>
          <p className="text-xl text-gray-400">
            Pregúntame sobre comandos, configuraciones o cualquier duda sobre Linux
          </p>
        </div>

        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 mb-12 border border-white/10">
          <div className="relative mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="¿En qué te puedo ayudar? Pregunta sobre comandos Linux, configuración de servidores o desarrollo..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 min-h-[120px] text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-500"
            />
            <button 
              onClick={handleSubmit}
              className="absolute bottom-4 right-4 p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              <option value="">Seleccionar Proveedor de IA</option>
              {Object.keys(AI_MODELS).map(provider => (
                <option key={provider} value={provider}>
                  {provider.toUpperCase()}
                </option>
              ))}
            </select>

            {showModels && (
              <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm text-gray-400 mb-2">Modelos disponibles:</h3>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
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
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 pr-24"
                />
                {isApiKeyValid && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Terminal, text: "Comandos Linux" },
            { icon: FileCode, text: "Scripts Shell" },
            { icon: Server, text: "Configuración" },
            { icon: Box, text: "Despliegues" }
          ].map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="flex items-center justify-center gap-2 p-4 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Icon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-300">{text}</span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-400">
            Distribuciones Linux soportadas
          </h2>
          {Object.entries(DISTRO_INFO).map(([category, distros]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium text-green-500 mb-4">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(distros).map(([distro, description]) => (
                  <div
                    key={distro}
                    className="group relative"
                  >
                    <div className="aspect-square bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all duration-300 transform hover:scale-105 hover:border-green-500/50">
                      <Image
                        src={`/logos/${distro.toLowerCase()}.png`}
                        alt={distro}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-24 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs p-2 rounded-lg w-48 pointer-events-none">
                      <p className="font-semibold mb-1">{distro}</p>
                      <p className="text-gray-300 text-xs">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}