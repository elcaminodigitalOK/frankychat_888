"use client"

import { useState, useEffect } from "react"
import { Terminal, Code2, Eye, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAIStore } from '@/lib/store'
import { sendMessageToAI } from '@/lib/ai-service'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export function Workspace() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: '¡Hola! Soy Franky, tu experto en Linux. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date()
  }])
  const [input, setInput] = useState('')
  const { selectedModel, apiKey, provider, isLoading, setLoading, setError } = useAIStore()

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await sendMessageToAI(input, {
        model: selectedModel,
        apiKey: apiKey
      })
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content || 'Lo siento, hubo un error al procesar tu mensaje.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, ocurrió un error al procesar tu mensaje.',
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      <div className="flex-1 p-4">
        <Tabs defaultValue="chat" className="h-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#262626]">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Terminal
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Código
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Vista previa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="h-[calc(100%-40px)]">
            <div className="h-full overflow-y-auto pr-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-green-600/20 ml-auto max-w-[80%]' 
                      : 'bg-[#262626] max-w-[80%]'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  {message.timestamp && (
                    <div className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div className="h-full bg-[#262626] rounded-lg p-4">
              {/* Contenido para la pestaña de código */}
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="h-full bg-[#262626] rounded-lg p-4">
              {/* Contenido para la pestaña de vista previa */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-[#333]">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Escribe tu pregunta sobre Linux..."
            className="bg-[#262626] border-[#333] focus:border-green-500 min-h-[50px]"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}