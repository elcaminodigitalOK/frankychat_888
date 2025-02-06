import { useState } from 'react'

interface AISelectorProps {
  onSelectAI: (ai: string) => void;
  onSetApiKey: (key: string) => void;
}

export function AISelector({ onSelectAI, onSetApiKey }: AISelectorProps) {
  const [selectedAI, setSelectedAI] = useState('')
  const [apiKey, setApiKey] = useState('')

  const handleAIChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAI(e.target.value)
    onSelectAI(e.target.value)
  }

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value)
    onSetApiKey(e.target.value)
  }

  return (
    <div className="space-y-4">
      <select 
        value={selectedAI}
        onChange={handleAIChange}
        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
      >
        <option value="">Seleccionar IA</option>
        <option value="openai">OpenAI</option>
        <option value="gemini">Gemini</option>
        <option value="mistral">Mistral</option>
        <option value="ollama">Ollama</option>
        <option value="deepseek">DeepSeek</option>
        <option value="huggingface">HuggingFace</option>
      </select>

      <input
        type="password"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="API Key"
        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
      />
    </div>
  )
}