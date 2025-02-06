import Image from "next/image"

const DISTROS = [
  { name: "Ubuntu", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Fedora", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Debian", icon: "/placeholder.svg?height=40&width=40" },
  { name: "CentOS", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Arch", icon: "/placeholder.svg?height=40&width=40" },
  { name: "RHEL", icon: "/placeholder.svg?height=40&width=40" },
]

export function TechGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-8">
      {DISTROS.map((distro) => (
        <div
          key={distro.name}
          className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className="relative w-10 h-10">
            <Image src={distro.icon || "/placeholder.svg"} alt={distro.name} fill className="object-contain" />
          </div>
          <span className="text-sm text-zinc-400">{distro.name}</span>
        </div>
      ))}
    </div>
  )
}
