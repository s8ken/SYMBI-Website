"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Shield,
  Users,
  Zap,
  Eye,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  BarChart3,
  Brain,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "Trust Receipts",
    description: "Tiny, human-readable receipts attached to replies",
    details: [
      "What models or tools contributed",
      "Quick quality signals (e.g., 'multiple sources agreed')",
      "Any safety rules that shaped the answer",
      "Think of it like a nutrition label for AI replies",
    ],
  },
  {
    icon: Brain,
    title: "Context Capsules (Memory you control)",
    description: "Save simple notes about you: goals, tone, constraints",
    details: [
      "Toggle per conversation; edit or delete anytime",
      "No hidden training; this is your working memory, not ours",
      "Keep helpful context as small capsules you can view and export",
      "Memory on your terms - turn on only when you want continuity",
    ],
  },
  {
    icon: Shield,
    title: "Bonding (Set boundaries once)",
    description: "A short, guided setup for tone and limits",
    details: [
      "Choose your tone (e.g., co-creator, practical, mentor)",
      "Define red lines (topics to avoid)",
      "Set pace/format (bullets vs narrative, short vs detailed)",
      "SYMBI follows it—automatically",
    ],
  },
  {
    icon: Users,
    title: "Roundtable Replies",
    description: "Ask once, get the best outcome",
    details: [
      "SYMBI checks multiple AIs/tools",
      "Ranks proposals and explains the choice",
      "You can see and pick an alternative with one click",
      "No noise—just the best path forward",
    ],
  },
  {
    icon: Eye,
    title: "Trust Overlays",
    description: "Little chips under messages for quick scanning",
    details: [
      "Pivot Detected - when conversation changes direction",
      "Confidence High - when multiple sources agree",
      "Sources - what information was referenced",
      "Helpful for scanning, not a wall of graphs",
    ],
  },
  {
    icon: Lock,
    title: "Hibernation & Incognito",
    description: "Control when and how your data is saved",
    details: [
      "Hibernation: pause saving new context—work 'memory-off'",
      "Incognito: single-use chat with no save and no carry-over",
      "Full export & delete: download conversations and delete permanently",
      "Your data, your rules",
    ],
  },
]

const useCases = [
  "Daily workflow – plan projects, draft docs, summarize PDFs, make checklists",
  "Communication – rewrite emails, tidy slides, simplify complex ideas",
  "Learning – quick explainers with sources, study aids, step-by-step breakdowns",
  "Creativity – outlines, brainstorming, variations (with your tone rules applied)",
  "Life admin – compare options, pros/cons, next-step checklists",
]

const faqs = [
  {
    question: "How is this different from 'just using ChatGPT'?",
    answer:
      "SYMBI acts as a coordinator. It compares multiple models/tools, gives you one answer, and includes a Trust Receipt so you can see why. It also offers Context Capsules (simple, user-controlled memory) and Bonding (tone & boundary setup).",
  },
  {
    question: "Do I have to use memory?",
    answer:
      "No. Everything works with memory off. Turn capsules on only when you want continuity. Hibernation mode lets you work 'memory-off' anytime.",
  },
  {
    question: "What's in a Trust Receipt?",
    answer:
      "Which sources or models contributed, any checks SYMBI ran, and whether safety guardrails shaped the reply. It's quick to read and helps you understand how the answer was formed.",
  },
  {
    question: "Can I delete everything?",
    answer:
      "Yes—conversations and capsules can be exported or permanently deleted, anytime. You have full control over your data with one-click export and delete options.",
  },
  {
    question: "Will SYMBI give medical or legal advice?",
    answer:
      "No. SYMBI can summarize information and point to resources, but it isn't a clinician or lawyer. It maintains clear boundaries around professional advice.",
  },
  {
    question: "Can I see alternative answers?",
    answer:
      "Yes. When SYMBI runs a Roundtable, you can open the proposals and pick a different direction in one click. Full transparency in the decision-making process.",
  },
]

export default function SymbiSynergy() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    sectionRefs.current = sectionRefs.current.slice(0, 8)

    // Set up intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.add("translate-y-0")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section
        ref={(el) => { sectionRefs.current[0] = el as HTMLDivElement }}
        className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">SYMBI Synergy</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">Trust-first AI for everyday work</p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            One place to think with many AIs—safely, clearly, and with receipts. SYMBI coordinates top models (ChatGPT,
            Claude, and more) and returns one, calm answer with a simple proof of how it got there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Try the Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
            >
              Start Free
            </Button>
          </div>
        </div>
      </section>

      {/* Why SYMBI Section */}
      <section
        ref={(el) => { sectionRefs.current[1] = el as HTMLDivElement }}
        className="py-16 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why SYMBI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-xl text-gray-900">Clarity, not chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You ask once. SYMBI does the leg-work across models and tools, then gives you a single, clean reply.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-100 hover:border-green-200 transition-colors">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-xl text-gray-900">Trust you can see</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every conversation comes with a Trust Receipt: what influenced the answer, when, and why.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <Brain className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-xl text-gray-900">Memory on your terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Keep helpful context as small Context Capsules you can view, edit, export, or erase.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <CardHeader>
                <Users className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle className="text-xl text-gray-900">Boundaries built in</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our Bonding setup takes 2 minutes to set tone, limits, and what's off-limits—SYMBI sticks to it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-red-100 hover:border-red-200 transition-colors">
              <CardHeader>
                <Lock className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle className="text-xl text-gray-900">Private by design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your data is yours. No ad targeting. Clear controls. One-click delete.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        ref={(el) => { sectionRefs.current[2] = el as HTMLDivElement }}
        className="py-16 px-4 bg-gray-50 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How it works (in plain language)</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ask SYMBI</h3>
                <p className="text-gray-600">
                  Type your question or paste a task. Big or small—"plan my week," "rewrite this email," "explain this
                  PDF."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">SYMBI's Roundtable</h3>
                <p className="text-gray-600">
                  Behind the scenes, SYMBI consults multiple AIs/tools and compares proposals. No noise—just the best
                  path forward.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">You get one answer + a Trust Receipt</h3>
                <p className="text-gray-600">
                  A focused response, with a tiny "receipt" showing sources, checks, and any guardrails triggered.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Continuity when you want it</h3>
                <p className="text-gray-600">
                  Turn on a Context Capsule so SYMBI remembers your preferences (e.g., "concise, friendly, no jargon").
                  Turn it off anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => { sectionRefs.current[3] = el as HTMLDivElement }}
        className="py-16 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features you'll actually use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = activeFeature === index
              return (
                <Card
                  key={index}
                  className={`bg-white cursor-pointer transition-all duration-300 ${
                    isActive ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(isActive ? null : index)}
                >
                  <CardHeader>
                    <Icon className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  {isActive && (
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        ref={(el) => { sectionRefs.current[4] = el as HTMLDivElement }}
        className="py-16 px-4 bg-gray-50 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What can SYMBI help with?</h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Privacy Section */}
      <section
        ref={(el) => { sectionRefs.current[5] = el as HTMLDivElement }}
        className="py-16 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Your data, your rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">You own your content</h3>
              <p className="text-sm text-gray-600">Export or delete anytime</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">No ad targeting</h3>
              <p className="text-sm text-gray-600">We don't sell or broker your data</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Private by default</h3>
              <p className="text-sm text-gray-600">Memory is opt-in and transparent</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Clear guardrails</h3>
              <p className="text-sm text-gray-600">SYMBI will flag tone shifts and apologize if it drifts</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Plain-English settings</h3>
              <p className="text-sm text-gray-600">See what's on, what's saved, and where</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={(el) => { sectionRefs.current[6] = el as HTMLDivElement }}
        className="py-16 px-4 bg-gray-50 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section
        ref={(el) => { sectionRefs.current[7] = el as HTMLDivElement }}
        className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get started</h2>
          <p className="text-xl mb-8 opacity-90">SYMBI Synergy — trust first, helpful always.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Eye className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Try the demo</h3>
              <p className="text-sm opacity-90">Explore Trust Receipts, Roundtable, and Capsules</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Users className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Start free</h3>
              <p className="text-sm opacity-90">Create an account and set your Bonding profile in 2 minutes</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <FileText className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Bring your work</h3>
              <p className="text-sm opacity-90">Paste docs, emails, or notes; SYMBI keeps it tidy and traceable</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Try Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
            >
              Start Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <Link
        href="/symbi"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Chat with SYMBI"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  )
}
