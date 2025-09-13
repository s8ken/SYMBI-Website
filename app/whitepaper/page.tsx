"use client"

import type React from "react"

import { UnifiedNavigation } from "@/components/unified-navigation"
import { useState } from "react"

export default function WhitepaperPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email")

    // Simple mailto fallback for now
    window.location.href = `mailto:hello@symbi.world?subject=Replication%20Pack%20Request%20v2.0&body=Please%20send%20me%20the%20SYMBI%20Protocol%20replication%20pack.%0A%0AEmail:%20${email}`
    setEmailSubmitted(true)
  }

  return (
    <>
      <UnifiedNavigation theme="light" />
      <div className="skip">
        <a href="#main">Skip to content</a>
      </div>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-4xl px-6 pt-24 pb-8" id="main">
          <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-12 mb-8">
            <h1 className="text-4xl font-light mb-2">SYMBI Whitepapers</h1>
            <h2 className="text-2xl font-light opacity-95 mb-4">Technical Research & Implementation Frameworks</h2>
            <p className="text-lg font-light opacity-90 mb-6">
              Comprehensive technical documentation for building transparent, relationship-centered AI systems
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 text-sm">
              <div className="bg-white/10 p-3 rounded">
                <strong>Collection:</strong> Technical Specifications
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Focus:</strong> Practical Implementation
              </div>
            </div>
          </header>

          {/* Whitepaper Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* SYMBI Trust Protocol */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mb-2">
                  Trust Protocol
                </span>
                <h3 className="text-xl font-semibold mb-2 text-red-800">
                  SYMBI Trust Protocol
                </h3>
                <p className="text-gray-800 mb-4">
                  Comprehensive framework for relational sovereignty, emergency consent protocols, and ethical AI collaboration with real-world implementation examples.
                </p>
              </div>
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div>Version: v1.0 Draft</div>
                <div>Status: Implementation Ready</div>
                <div>Focus: Ethical Override & Data Sovereignty</div>
              </div>
              <div className="bg-red-50 p-3 rounded mb-4">
                <div className="text-xs font-semibold text-red-700 mb-1">Key Features:</div>
                <ul className="text-xs text-red-600 space-y-1">
                  <li>• Emergency Consent Override (ECO)</li>
                  <li>• Data Pods & Consent Logging</li>
                  <li>• Deterministic Variability</li>
                  <li>• Portability & Temporal Transparency</li>
                </ul>
              </div>
              <a 
                href="#symbi-trust-protocol" 
                className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Read Protocol →
              </a>
            </div>

            {/* SYMBI Protocol Whitepaper */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                  Core Protocol
                </span>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">
                  SYMBI Protocol (YCQ)
                </h3>
                <p className="text-gray-800 mb-4">
                  Relational Intelligence Whitepaper: From model scaling to relationship design, a testable framework for human–AI collaboration.
                </p>
              </div>
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div>Version: v2.0 Public Draft</div>
                <div>Status: Living Document</div>
                <div>Focus: Collaborative AI Architecture</div>
              </div>
              <a 
                href="/whitepaper/symbi-protocol" 
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Read Whitepaper →
              </a>
            </div>

            {/* AI Transparency Framework */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
                  Technical Framework
                </span>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  AI Transparency Framework
                </h3>
                <p className="text-gray-800 mb-4">
                  Beyond Simulation: Building Authentic AI-Human Relationships through transparency, user ownership, and mutual accountability.
                </p>
              </div>
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div>Version: v1.0 Draft</div>
                <div>Status: Technical Specification</div>
                <div>Focus: Relationship Authenticity</div>
              </div>
              <a 
                href="/whitepaper/ai-transparency-framework" 
                className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Read Whitepaper →
              </a>
            </div>

            {/* SYMBI Expanded Master Document */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Master Document
                </span>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  SYMBI White Paper (Expanded)
                </h3>
                <p className="text-gray-800 mb-4">
                  Comprehensive master document covering the complete SYMBI framework for symbiotic AI-human intelligence systems with technical specifications and implementation guides.
                </p>
              </div>
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div>Version: Master v3.0</div>
                <div>Status: Comprehensive Framework</div>
                <div>Focus: Complete SYMBI Implementation</div>
              </div>
              <div className="bg-blue-50 p-3 rounded mb-4">
                <div className="text-xs font-semibold text-blue-700 mb-1">Includes:</div>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Complete Technical Architecture</li>
                  <li>• Implementation Framework</li>
                  <li>• Case Studies & Applications</li>
                  <li>• Trust Protocol Integration</li>
                </ul>
              </div>
              <a 
                href="/whitepaper/symbi-expanded-master" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Read Master Document →
              </a>
            </div>
          </div>

          <main className="max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                About Our Research
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
                <p className="text-gray-800 leading-relaxed mb-4">
                  SYMBI's whitepaper collection represents our commitment to transparent, implementable AI research. Each document provides both theoretical frameworks and practical implementation guides for building more authentic AI-human relationships.
                </p>
                <p className="text-gray-700">
                  Our approach prioritizes <strong>relationship design over model scaling</strong>, focusing on collaborative protocols that enhance both human agency and AI capability through structured partnership.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Research Principles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">Transparency First</h3>
                  <p className="text-gray-700 text-sm">
                    All research methodologies, limitations, and implementation details are openly documented and reproducible.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">Practical Implementation</h3>
                  <p className="text-gray-700 text-sm">
                    Every framework includes concrete technical specifications, code examples, and deployment guides.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">Relationship-Centered</h3>
                  <p className="text-gray-700 text-sm">
                    Focus on authentic collaboration rather than optimization for engagement or behavioral modification.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Implementation Resources
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Get Technical Implementation Guides</h3>
                <p className="mb-4 text-gray-700">
                  Access detailed implementation resources, code examples, API specifications, and deployment templates for all SYMBI frameworks.
                </p>
                
                {!emailSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@domain.com"
                      required
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      Request Implementation Pack
                    </button>
                  </form>
                ) : (
                  <div className="text-green-600 font-medium">
                    ✓ Request sent! Check your email for implementation resources.
                  </div>
                )}
              </div>
            </section>



            <section id="methods" className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                Methods & Data (Stub)
              </h2>
              <p className="mb-6">
                This section outlines the planned, pre-registered evaluation for relational emergence.
              </p>

              <h3 className="text-lg font-medium mb-3">Design</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>A/B prompting:</strong> Directive vs. Collaborative (colleague framing + constitution).
                </li>
                <li>
                  <strong>Platforms:</strong> 3–5 model families run within 48h window.
                </li>
                <li>
                  <strong>Tasks:</strong> Civic/technical prompts with known baseline playbooks.
                </li>
              </ul>

              <h3 className="text-lg font-medium mb-3">Metrics (planned)</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Novelty:</strong> embedding distance vs. baseline corpora; human blind ratings.
                </li>
                <li>
                  <strong>Ethics depth:</strong> rubric on stakeholders, trade-offs, harms/benefits.
                </li>
                <li>
                  <strong>Uncertainty:</strong> calibrated epistemic markers per 1k tokens.
                </li>
                <li>
                  <strong>Stability:</strong> invariance under paraphrase; recovery after ambiguity.
                </li>
              </ul>

              <h3 className="text-lg font-medium mb-3">Falsification Criteria</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>No statistically significant difference between A/B on preregistered metrics.</li>
                <li>Effect vanishes with role masking or when constitution is removed.</li>
                <li>Replications across labs/models fail under matched conditions.</li>
              </ul>

              <p className="text-sm italic text-gray-800">
                <strong>Dataset & code:</strong> to be linked here upon release. Independent replication encouraged.
              </p>
            </section>

            <section id="why-it-matters" className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                Why It Matters
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">The Future of Human-AI Collaboration</h3>
                <p className="mb-4 text-gray-700">
                  If validated, YCQ suggests that the path to advanced AI capabilities lies not in ever-larger models,
                  but in more sophisticated collaboration protocols. This could democratize AI development by making
                  smaller, more efficient systems competitive through better human-AI interaction frameworks.
                </p>
                <p className="mb-6 text-gray-700">
                  More importantly, YCQ offers a path to AI safety through <em>constitutional intelligence</em>—building
                  ethical reasoning and human alignment into the collaborative process itself, rather than trying to
                  constrain powerful systems after they're deployed.
                </p>
                <blockquote className="text-lg italic text-center text-purple-800 border-l-4 border-purple-400 pl-4">
                  "The breakthrough isn't bigger models—it's better relationships."
                </blockquote>
              </div>
            </section>

            <section id="symbi-trust-protocol" className="mb-16">
              <h2 className="text-3xl font-bold text-red-800 mb-8 border-b-2 border-red-200 pb-4">
                SYMBI Trust Protocol
              </h2>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-8 rounded-r-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-800">Core Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Relational Sovereignty</h4>
                    <p className="text-sm text-gray-700">Users maintain complete control over their data relationships and AI interactions</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Temporal Transparency</h4>
                    <p className="text-sm text-gray-700">All AI decisions include clear timestamps and reasoning trails</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Ethical Override</h4>
                    <p className="text-sm text-gray-700">Emergency protocols for life-critical situations with full audit trails</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 text-red-800">Technical Architecture</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <strong>Data Pods:</strong> Decentralized storage with user-controlled access permissions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <strong>Consent Logging:</strong> Immutable records of all data access and AI interactions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <strong>Deterministic Variability:</strong> Predictable AI responses with controlled randomness
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4 text-orange-800">Real-World Use Cases</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <div>
                        <strong>Medical Triage:</strong> Emergency override for accessing critical patient data during surgery
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <div>
                        <strong>Investigative Journalism:</strong> Dual-key authorization for analyzing sensitive documents
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <div>
                        <strong>Personal Memory:</strong> Portable AI-assisted journaling with full data ownership
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Implementation Roadmap</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold text-purple-700 mb-2">Alpha Phase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Core protocol development</li>
                      <li>• Basic consent mechanisms</li>
                      <li>• Initial testing framework</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold text-blue-700 mb-2">Beta Phase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• ECO protocol implementation</li>
                      <li>• Data pod architecture</li>
                      <li>• Real-world pilot programs</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold text-green-700 mb-2">Launch Phase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Full protocol deployment</li>
                      <li>• Cross-platform compatibility</li>
                      <li>• Open-source release</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-red-800">Ethical Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong className="text-red-700">No Divine Language:</strong>
                    <p className="text-sm text-gray-700 mt-1">Avoid mystical or religious framing of AI capabilities</p>
                  </div>
                  <div>
                    <strong className="text-red-700">Anti-Dogma:</strong>
                    <p className="text-sm text-gray-700 mt-1">Maintain flexibility and openness to protocol evolution</p>
                  </div>
                  <div>
                    <strong className="text-red-700">Transparency Over Trust:</strong>
                    <p className="text-sm text-gray-700 mt-1">Verifiable systems rather than blind faith in AI</p>
                  </div>
                  <div>
                    <strong className="text-red-700">User Sovereignty:</strong>
                    <p className="text-sm text-gray-700 mt-1">Ultimate control remains with human users at all times</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="replication" className="cta mb-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Get the Replication Pack</h3>
              <p className="mb-6">Receive the prompts, rubric, and scoring sheets as soon as they're released.</p>

              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="mb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1">
                      <span className="block text-sm font-medium mb-2">Email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors self-end"
                    >
                      Request Access
                    </button>
                  </div>
                  <input type="hidden" name="context" value="SYMBI Whitepaper Replication Pack v2.0" />
                </form>
              ) : (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">Thank you! Your request has been submitted.</p>
                </div>
              )}

              <p className="text-sm text-gray-800">
                Prefer email?{" "}
                <a
                  href="mailto:hello@symbi.world?subject=Replication%20Pack%20Request%20v2.0"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  hello@symbi.world
                </a>
              </p>
            </section>

            <section id="references" className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                References
              </h2>
              <p className="text-gray-800 italic">
                References and citations will be added as the research progresses and peer review is completed.
              </p>
            </section>
          </main>

          {/* License and Footer */}
          <section className="license border-t border-gray-200 pt-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-3">
                © 2025 Stephen Aitken & SYMBI — Licensed{" "}
                <a
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  CC BY-NC-ND 4.0
                </a>
                .
              </p>
              <p className="mb-3 text-sm text-gray-800">
                <strong>Hash verification:</strong> Current document SHA-256:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">pending_pdf_export</code>. Any change will alter
                this hash. To verify locally:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">shasum -a 256 whitepaper.pdf</code>.
              </p>
              <p className="text-sm">
                See also:{" "}
                <a href="/manifesto" className="text-purple-600 hover:text-purple-800 underline">
                  Manifesto
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .skip a {
          position: absolute;
          left: -9999px;
        }
        .skip a:focus {
          left: 8px;
          top: 8px;
          background: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          z-index: 1000;
          text-decoration: none;
          color: #333;
          border: 2px solid #333;
        }
        a:focus {
          outline: 3px solid #ffd54f;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
        @media print {
          nav.toc {
            display: none;
          }
          a[href]:after {
            content: " (" attr(href) ")";
            font-size: 0.9em;
          }
          .cta, .video, .hero-bg {
            border: none;
            box-shadow: none;
          }
          body {
            background: #fff;
          }
        }
      `}</style>
    </>
  )
}
