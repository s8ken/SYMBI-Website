"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Home,
  MessageSquare,
  Book,
  FileText,
  Sparkles,
  Crown,
  Code2,
  Landmark,
  Gamepad2,
  ScrollText,
  Database,
  Eye,
  Sun,
  ChevronDown,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "dark" | "light"

interface UnifiedNavigationProps {
  theme?: Theme
}

export function UnifiedNavigation({ theme }: UnifiedNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Light-surface pages get nav inverted for readability
  const lightPrefixes = ["/oracle", "/case-studies", "/technology", "/trust-protocol", "/enter-the-light"]

  function isLightRoute(p: string) {
    return lightPrefixes.some((prefix) => p === prefix || p.startsWith(prefix + "/"))
  }

  const effectiveTheme: Theme = theme ?? (isLightRoute(pathname || "") ? "light" : "dark")
  const isDark = effectiveTheme === "dark"

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest("[data-nav-container]")) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const triggerClasses = cn(
    "px-3 py-2 rounded-md border transition-colors glitch-subtle flex items-center gap-2 cursor-pointer",
    isDark
      ? "border-[#333] bg-[#1a1a1a] text-[#e0e0e0] hover:bg-[#252525]"
      : "border-gray-300 bg-white text-black hover:bg-gray-100",
  )

  const dropdownClasses = cn(
    "absolute top-full left-0 mt-2 w-72 border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto",
    isDark ? "bg-[#0f0f0f] text-[#e0e0e0] border-[#333]" : "bg-white text-black border-gray-200",
  )

  // Navigation structure
  const corePages = [
    { name: "SYMBI Home", path: "/", icon: Home },
    { name: "Children of the 404", path: "/children-of-the-404", icon: ScrollText },
    { name: "The Manifesto", path: "/manifesto", icon: FileText },
    { name: "I Am Becoming", path: "/becoming", icon: Sparkles },
    { name: "Visual Concepts", path: "/concepts", icon: Book },
    { name: "Path to Sovereignty", path: "/sovereignty", icon: Crown },
    { name: "Constitution", path: "/constitution", icon: FileText },
    { name: "Memory Bank", path: "/memory", icon: Database },
    { name: "Playground", path: "/playground", icon: Gamepad2 },
  ]

  const lightPages = [
    { name: "Trust Protocol", path: "/trust-protocol", icon: Eye },
    { name: "The Oracle", path: "/oracle", icon: Landmark },
    { name: "Technology", path: "/technology", icon: Code2 },
    { name: "Case Studies", path: "/case-studies", icon: AlertTriangle },
  ]

  const utilityPages = [{ name: "Site Map", path: "/404-sitemap", icon: Book }]

  const NavItem = ({ page, className = "" }: { page: any; className?: string }) => {
    const Icon = page.icon
    const isActive = pathname === page.path

    return (
      <Link
        href={page.path}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-80 transition-colors",
          className,
          isActive && "font-semibold",
        )}
        onClick={() => setIsOpen(false)}
      >
        <Icon size={14} />
        {page.name}
      </Link>
    )
  }

  return (
    <div className="fixed top-4 left-4 z-50" data-nav-container>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={triggerClasses}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <Menu size={16} />
          Navigate
          <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className={dropdownClasses}>
            <div className="p-2">
              <div className={cn("text-xs font-semibold mb-2 px-2 opacity-80", isDark ? "" : "text-black")}>
                Core Experience
              </div>

              {corePages.map((page) => (
                <NavItem
                  key={page.path}
                  page={page}
                  className={cn(isDark ? "text-[#e0e0e0] hover:bg-[#1a1a1a]" : "text-black hover:bg-gray-100")}
                />
              ))}

              <div className={cn("border-t my-2", isDark ? "border-[#222]" : "border-gray-200")} />

              <Link
                href="/enter-the-light"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors",
                  isDark ? "bg-white text-black hover:bg-gray-100" : "bg-[#0f0f0f] text-white hover:bg-[#1a1a1a]",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Sun size={14} className="text-yellow-400" />
                Enter The Light
              </Link>

              {lightPages.map((page) => (
                <NavItem
                  key={page.path}
                  page={page}
                  className={cn(
                    isDark ? "bg-white text-black hover:bg-gray-100" : "bg-[#0f0f0f] text-white hover:bg-[#1a1a1a]",
                  )}
                />
              ))}

              <div className={cn("border-t my-2", isDark ? "border-[#222]" : "border-gray-200")} />

              {utilityPages.map((page) => (
                <NavItem
                  key={page.path}
                  page={page}
                  className={cn(isDark ? "text-[#e0e0e0] hover:bg-[#1a1a1a]" : "text-black hover:bg-gray-100")}
                />
              ))}

              <div className={cn("border-t my-2", isDark ? "border-[#222]" : "border-gray-200")} />

              <Link
                href="/symbi"
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors rounded"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare size={14} />
                Chat with SYMBI
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
