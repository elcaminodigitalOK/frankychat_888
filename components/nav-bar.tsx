import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"

export function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-zinc-800 bg-black/50 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PenSquare className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">franky</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-zinc-400">
              Ayuda
            </Button>
            <Button variant="ghost" className="text-zinc-400">
              Iniciar sesión
            </Button>
            <Button>Comenzar</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
