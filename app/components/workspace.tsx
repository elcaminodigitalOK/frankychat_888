"use client"

import { useState, useEffect } from "react"
import { Terminal, Code2, Eye, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkspaceProps {
  initialMessage: string
}

export function Workspace({ initialMessage }: WorkspaceProps) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy Franky, tu experto en Linux. ¿En qué puedo ayudarte hoy?" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage)
    }
  }, [initialMessage]) // Added initialMessage to dependencies

  const handleSend = async (message: string = input) => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: message }])
    setInput("")
    setIsLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Aquí está un ejemplo de cómo podrías hacer eso en Linux...",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Chat Section */}
      <div className="w-[400px] border-r border-zinc-800 flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                msg.role === "assistant"
                  ? "bg-zinc-900/50 border border-zinc-800"
                  : "bg-green-900/20 border border-green-800"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              className="bg-zinc-900/50 border-zinc-800 resize-none"
              rows={3}
            />
            <Button onClick={() => handleSend()} className="self-end" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Workspace Section */}
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="code" className="flex-1 flex flex-col">
          <div className="border-b border-zinc-800 p-2">
            <TabsList className="bg-zinc-900">
              <TabsTrigger value="code">
                <Code2 className="h-4 w-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="terminal">
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Vista previa
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 p-4">
            <TabsContent value="code" className="h-full">
              <div className="h-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <pre className="text-sm">
                  <code># Ejemplo de código echo "¡Hola desde Linux!"</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="terminal" className="h-full">
              <div className="h-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <pre className="text-sm text-green-400">franky@linux:~$ _</pre>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="h-full">
              <div className="h-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="text-center text-zinc-400">Vista previa disponible</div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
