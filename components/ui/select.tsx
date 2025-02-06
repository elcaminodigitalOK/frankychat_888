"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AI_MODELS = [
  { value: "openrouter", label: "OpenRouter" },
  { value: "gemini", label: "Gemini" },
  { value: "ollama", label: "Ollama" },
  { value: "deepseek", label: "DeepSeek" },
  { value: "mistral", label: "Mistral" },
  { value: "openai", label: "OpenAI" },
  { value: "grok", label: "xAI Grok Beta" },
  { value: "lmstudio", label: "LM Studio" },
  { value: "huggingface", label: "HuggingFace" },
  { value: "cohere", label: "Cohere" },
  { value: "perplexity", label: "Perplexity" },
  { value: "bedrock", label: "AWS Bedrock" },
  { value: "together", label: "Together" }
]

export function AISelector() {
  return (
    <div className="flex gap-2 w-full">
      <Select>
        <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700">
          <SelectValue placeholder="Seleccionar IA" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          {AI_MODELS.map((model) => (
            <SelectItem key={model.value} value={model.value} className="text-white hover:bg-gray-800">
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <input 
        type="text" 
        placeholder="Introducir API KEY"
        className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-500"
      />
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
