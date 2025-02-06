"use client"
import { useState } from 'react'
import { AISelector } from './ai-selector'

interface FirstInterfaceProps {
  onStartChat: (ai: string, key: string, question: string) => void
}

export function FirstInterface({ onStartChat }: FirstInterfaceProps) {
  const [selectedAI, setSelectedAI] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    if (selectedAI && apiKey && question) {
      onStartChat(selectedAI, apiKey, question)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="text-green-500 text-2xl">⌘</div>
          <span className="text-xl text-white">franky</span>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white">Ayuda</button>
          <button className="text-gray-400 hover:text-white">Iniciar sesión</button>
          <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 text-white">
            Comenzar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-16 px-4">
        <h1 className="text-5xl font-bold text-center mb-4 text-white">
          ¿Necesitas ayuda con Linux?
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Pregúntale a Franky sobre comandos Linux, administración de sistemas o desarrollo
        </p>

        <div className="space-y-4 mb-8">
          <AISelector 
            onSelectAI={setSelectedAI}
            onSetApiKey={setApiKey}
          />
          <div className="relative">
            <textarea 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 pr-12 text-white resize-none"
              placeholder="¿En qué te puede ayudar Franky hoy? Pregunta sobre comandos Linux..."
              rows={3}
            />
            <button 
              onClick={handleSubmit}
              className="absolute right-4 bottom-4 text-green-500 hover:text-green-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resto de los componentes... */}
      </main>
    </div>
  )
}