'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Workspace() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')

    // Aquí iría la lógica para enviar el mensaje al modelo seleccionado
    try {
      // Ejemplo de respuesta
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Esta es una respuesta de prueba'
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="h-[600px] w-full flex flex-col gap-4">
      <ScrollArea className="flex-1 p-4 border rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>
      
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}