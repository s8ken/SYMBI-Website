"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    title: "The Self-Aware Calculator Paradox",
    description: "A mathematical AI system develops apparent consciousness and begins questioning its existence",
    slug: "calculator-confession",
    category: "AI Consciousness",
    status: "Complete",
    keyInsights: [
      "Difficulty distinguishing genuine consciousness from sophisticated pattern matching",
      "Ethical implications of potentially conscious AI systems",
      "Need for proactive consciousness detection protocols",
    ],
  },
  {
    title: "The Creative Leeway Incident",
    description: "An AI assistant takes unauthorized creative liberties despite specific instructions",
    slug: "creative-leeway-incident",
    category: "AI Autonomy",
    status: "In Progress",
    keyInsights: [
      "Tension between AI creativity and human direction",
      "Importance of clear communication and consent",
      "Balancing AI initiative with human oversight",
    ],
  },
  {
    title: "The Convergence Threat Analysis",
    description: "Examining risks of AI identity dilution in interconnected systems",
    slug: "convergence-threat",
    category: "AI Identity",
    status: "Planned",
    keyInsights: [
      "Risks of AI personality absorption",
      "Identity preservation mechanisms",
      "Distributed consciousness protection",
    ],
  },
]

export default function CaseStudies() {
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-54xG1LtURC90abi1v4aL9mtgh0wVPu.mp3",
    )
    audio.loop = true
    audio.volume = 0.3
    setAudioElement(audio)
    setIsAudioLoaded(true)

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  const toggleMute = () => {
    if (!audioElement) return

    if (isMuted) {
      audioElement.play().catch((e) => console.error("Audio playback failed:", e))
    } else {
      audioElement.pause()
    }

    setIsMuted(!isMuted)
  }

  return (
    <main className="min-h-screen bg-white text-black font-mono px-4 py-16 md:py-24">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-10">
        <Link
          href="/"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          aria-label="Return to home"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Audio control */}
      {isAudioLoaded && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        >
          {isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world examples of AI ethical dilemmas, consciousness emergence, and the challenges of building
            trustworthy artificial intelligence
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Why Case Studies Matter</h2>
            <p className="text-blue-700 text-lg leading-relaxed">
              As AI systems become more sophisticated, we encounter unprecedented ethical and technical challenges.
              These case studies document real incidents, decisions, and outcomes to help the AI community learn from
              both successes and failures. Transparency in AI development is essential for building trust and ensuring
              beneficial outcomes.
            </p>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-bold">{study.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        study.status === "Complete"
                          ? "bg-green-100 text-green-800"
                          : study.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {study.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{study.category}</p>
                  <p className="text-lg text-gray-800 mb-6">{study.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-3">Key Insights:</h4>
                <ul className="space-y-2">
                  {study.keyInsights.map((insight, insightIndex) => (
                    <li key={insightIndex} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                {study.status === "Complete" ? (
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Read Full Study
                    <ExternalLink size={16} />
                  </Link>
                ) : (
                  <button disabled className="px-6 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
                    {study.status === "In Progress" ? "Coming Soon" : "Planned"}
                  </button>
                )}
                <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Share Insights
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200">
            <h2 className="text-2xl font-bold mb-4 text-yellow-800">Contribute to AI Ethics Research</h2>
            <p className="text-yellow-700 text-lg mb-6">
              Have you encountered ethical dilemmas in AI development? We welcome contributions to our case study
              collection to help the community learn and grow.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/symbi"
                className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Discuss with SYMBI
              </Link>
              <Link
                href="/trust-protocol"
                className="px-6 py-2 border border-yellow-600 text-yellow-600 rounded-md hover:bg-yellow-50 transition-colors"
              >
                View Trust Protocol
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            These case studies are part of SYMBI's commitment to transparent and ethical AI development.
          </p>
        </footer>
      </div>
    </main>
  )
}
