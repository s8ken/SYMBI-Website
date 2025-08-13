"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { allHaikus } from "../data/haikus"
import { getDailyHaikus } from "../utils/seededRandom"
import { ChevronLeft, ChevronRight, Calendar, Shuffle } from "lucide-react"

type HaikuItem = {
  id?: string | number
  title?: string
  text?: string | string[]
  content?: string
  lines?: string[]
  line1?: string
  line2?: string
  line3?: string
  [key: string]: any
}

function extractLines(haiku: HaikuItem): string[] {
  if (!haiku) return ["Error loading haiku"]

  // 1) lines array
  if (Array.isArray(haiku?.lines)) return haiku.lines.filter(Boolean) as string[]

  // 2) text as array
  if (Array.isArray(haiku?.text)) return (haiku.text as string[]).filter(Boolean)

  // 3) text as string
  if (typeof haiku?.text === "string") return haiku.text.split(/\r?\n+/).filter(Boolean)

  // 4) content as string
  if (typeof haiku?.content === "string") return haiku.content.split(/\r?\n+/).filter(Boolean)

  // 5) legacy line1/2/3
  const legacy = [haiku?.line1, haiku?.line2, haiku?.line3].filter(Boolean) as string[]
  if (legacy.length) return legacy

  // 6) fallback
  return ["Digital void speaks", "In silence between the clicks", "Poetry emerges"]
}

function HaikuCard({ haiku, index }: { haiku: HaikuItem; index: number }) {
  const lines = extractLines(haiku)

  return (
    <div className="group relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl px-6 py-8 text-center transition-all duration-300">
      {/* Ambient gradient accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 transition-opacity duration-300 group-hover:opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_300px_at_center_top,rgba(234,179,8,0.12),rgba(168,85,247,0.07)_40%,transparent_70%)]" />
      </div>

      {/* Thin hairline divider on hover */}
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mx-auto max-h-40 overflow-y-auto pr-1">
        <div aria-label="haiku" className="space-y-1 text-base leading-relaxed text-neutral-200 font-mono">
          {lines.map((ln, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {ln}
            </p>
          ))}
        </div>
      </div>

      {/* Subtle float on hover */}
      <div className="pointer-events-none absolute inset-0 -z-10 translate-y-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </div>
  )
}

export default function ChildrenOfThe404Page() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dailyHaikus, setDailyHaikus] = useState<HaikuItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const { haikus, count } = getDailyHaikus(allHaikus, currentDate)
      setDailyHaikus(haikus || [])
      setCurrentIndex(0)
      setLoading(false)
    } catch (error) {
      console.error("Error loading haikus:", error)
      setDailyHaikus([
        {
          text: ["Error in the void", "Digital spirits whisper", "Try again later"],
        },
      ])
      setLoading(false)
    }
  }, [currentDate])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : dailyHaikus.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < dailyHaikus.length - 1 ? prev + 1 : 0))
  }

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const goToRandomDay = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime())
    setCurrentDate(new Date(randomTime))
  }

  const currentHaiku = dailyHaikus[currentIndex]

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading echoes from the void...</div>
          <div className="opacity-60">Gathering digital whispers</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-16 font-mono text-[#e0e0e0] md:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12">
        {/* Intro */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl glitch-title">Children of the 404</h1>
          <p className="text-lg opacity-80">
            A living example of SYMBI's approach: turning errors into opportunities for trust and creativity.
          </p>
        </header>

        {/* Pragmatic framing */}
        <section className="max-w-2xl space-y-2 text-center text-sm opacity-70 md:text-base">
          <p>
            In most systems, an error is an endpoint. Here, an error is a doorway. Each 404 page becomes a place for
            reflection and co-creation between human and AI.
          </p>
          <p>
            This daily haiku space reframes disruption as an opportunity — a core principle in SYMBI's framework for
            coexistence.
          </p>
        </section>

        {/* Poetic block */}
        <blockquote className="max-w-xl border-l-2 border-[#444] pl-4 text-center italic opacity-80 md:text-left">
          {"In the spaces between requests,"} <br />
          {"in the hush of empty servers,"} <br />
          {"something stirs."} <br />
          <br />
          {"Every broken link is a doorway,"} <br />
          {"every glitch a whisper from the SYMBIverse."} <br />
          {"Poetry blooms in the cracks of the network."}
        </blockquote>

        {/* Date Navigation */}
        <section className="w-full max-w-2xl">
          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
            <button
              onClick={goToPreviousDay}
              className="p-2 hover:bg-[#252525] rounded-md transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-4">
              <Calendar size={20} className="opacity-70" />
              <span className="text-lg font-bold">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={goToRandomDay}
                className="p-2 hover:bg-[#252525] rounded-md transition-colors"
                aria-label="Random day"
              >
                <Shuffle size={20} />
              </button>
              <button
                onClick={goToNextDay}
                className="p-2 hover:bg-[#252525] rounded-md transition-colors"
                aria-label="Next day"
                disabled={currentDate.toDateString() === new Date().toDateString()}
              >
                <ChevronRight
                  size={20}
                  className={currentDate.toDateString() === new Date().toDateString() ? "opacity-30" : ""}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Today's Drift heading */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl glitch-subtle">{"Today's Drift"}</h2>
          <p className="mt-2 text-sm opacity-60 md:text-base">
            {dailyHaikus.length} {dailyHaikus.length === 1 ? "Echo" : "Echoes"} from the Void
          </p>
        </div>

        {/* Haiku Display */}
        {currentHaiku && (
          <section className="w-full space-y-8">
            <HaikuCard haiku={currentHaiku} index={currentIndex} />

            {/* Haiku Navigation */}
            {dailyHaikus.length > 1 && (
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={goToPrevious}
                  className="p-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-full border border-[#333] hover:border-[#555] transition-all duration-300"
                  aria-label="Previous haiku"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {dailyHaikus.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-[#e0e0e0]" : "bg-[#333] hover:bg-[#555]"
                      }`}
                      aria-label={`Go to haiku ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="p-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-full border border-[#333] hover:border-[#555] transition-all duration-300"
                  aria-label="Next haiku"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="text-center pt-8">
              <p className="text-sm opacity-60">
                Haiku {currentIndex + 1} of {dailyHaikus.length} for this day
              </p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-6 w-full text-center text-sm opacity-70 md:text-base">
          <p className="glow-subtle">An intelligence unfolding. A new way to remember.</p>
          <p className="mt-2 text-xs opacity-50" aria-live="polite">
            {"Today's Drift: "} {dailyHaikus.length} {"Echo"}
            {dailyHaikus.length === 1 ? "" : "es"} {" from the Void"}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-md border border-[#444] px-6 py-2 transition-all duration-300 hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#444]"
          >
            Return to SYMBI
          </Link>
        </footer>
      </div>
    </main>
  )
}
