"use client"
import { useState } from 'react'
import { Terminal, Code2, Eye, Send, Download, GitBranch, RefreshCw } from 'lucide-react'

interface WorkspaceInterfaceProps {
  selectedAI: string
  apiKey: string
  initialQuestion: string
}

export function WorkspaceInterface({ selectedAI, apiKey, initialQuestion }: WorkspaceInterfaceProps) {
  const [messages, setMessages] = useState([
    { role: 'user', content: initialQuestion }
  ])

  return (
    <div className="flex h-screen bg-black">
      {/* Barra de herramientas superior */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <Code2 className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <Eye className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <Download className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <RefreshCw className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <Terminal className="w-5 h-5 text-green-500" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <GitBranch className="w-5 h-5 text-green-500" />
          </button>
        </div>
        <div className="text-white">{selectedAI}</div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-1 mt-12">
        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-green-600' : 'bg-gray-800'
                } text-white`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <button className="p-2 bg-green-600 rounded-lg hover:bg-green-700">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="w-96 bg-gray-900 p-4 border-l border-gray-800">
          <div className="text-sm font-mono bg-black rounded-lg p-2 h-full text-green-500">
            $ _
          </div>
        </div>
      </div>
    </div>
  )
}