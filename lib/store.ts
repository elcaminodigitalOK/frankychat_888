import { create } from 'zustand'

interface AIStore {
  selectedModel: string
  apiKey: string
  setModel: (model: string) => void
  setApiKey: (key: string) => void
}

export const useAIStore = create<AIStore>((set) => ({
  selectedModel: '',
  apiKey: '',
  setModel: (model) => set({ selectedModel: model }),
  setApiKey: (key) => set({ apiKey: key })
}))