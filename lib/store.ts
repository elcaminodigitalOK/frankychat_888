// lib/store.ts
import { create } from 'zustand'
import { AIModel } from './api/types'

interface AIStore {
  selectedModel: string
  apiKey: string
  provider: string
  availableModels: AIModel[]
  isLoading: boolean
  error: string | null
  setModel: (model: string) => void
  setApiKey: (key: string) => void
  setProvider: (provider: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAIStore = create<AIStore>((set) => ({
  selectedModel: '',
  apiKey: '',
  provider: '',
  availableModels: [],
  isLoading: false,
  error: null,
  setModel: (model) => set({ selectedModel: model }),
  setApiKey: (key) => set({ apiKey: key }),
  setProvider: (provider) => set({ provider }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}))