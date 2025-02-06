'use client'

import { useState } from 'react'
import { Terminal, FileCode, Server, Box, Send, Check } from 'lucide-react'

export default function HomeInterface() {
  const [selectedAI, setSelectedAI] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [inputMessage, setInputMessage] = useState('')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-500" />
          <span className="text-xl font-semibold">franky</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white px-4 py-2">Ayuda</button>
          <button className="text-gray-400 hover:text-white px-4 py-2">Iniciar sesión</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Comenzar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          ¿Necesitas ayuda con Linux?
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Pregúntale a Franky sobre comandos Linux, administración de sistemas o desarrollo
        </p>

        {/* Input Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="relative mb-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="¿En qué te puede ayudar Franky hoy? Pregunta sobre comandos Linux, configuración de servidores o desarrollo..."
              className="w-full bg-transparent border border-gray-800 rounded-lg p-3 min-h-[100px] text-white resize-none"
            />
            <button className="absolute bottom-3 right-3 bg-green-600 hover:bg-green-700 p-2 rounded">
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedAI}
              onChange={(e) => setSelectedAI(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
            >
              <option value="">Seleccionar IA</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5</option>
            </select>

            <div className="flex flex-1 gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Introducir API KEY"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
              />
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded">
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Terminal, text: "Aprender comandos básicos" },
            { icon: FileCode, text: "Escribir un script shell" },
            { icon: Server, text: "Configurar servicios" },
            { icon: Box, text: "Desplegar aplicaciones" }
          ].map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <Icon className="w-5 h-5" />
              {text}
            </button>
          ))}
        </div>

        {/* Linux Distributions */}
        <p className="text-gray-400 text-center mb-6">o explora distribuciones populares de Linux</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
          {["Ubuntu", "Fedora", "Debian", "CentOS", "Arch", "RHEL"].map((distro) => (
            <div
              key={distro}
              className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer"
            >
              {distro}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}