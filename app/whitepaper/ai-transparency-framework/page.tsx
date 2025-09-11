"use client"

import type React from "react"
import { UnifiedNavigation } from "@/components/unified-navigation"
import { useState } from "react"

export default function AITransparencyWhitepaperPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email")

    window.location.href = `mailto:hello@symbi.world?subject=AI%20Transparency%20Framework%20Request&body=Please%20send%20me%20the%20AI%20Transparency%20Framework%20whitepaper.%0A%0AEmail:%20${email}`
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
          <header className="bg-gradient-to-r from-gray-800 to-black text-white rounded-lg p-12 mb-8">
            <h1 className="text-4xl font-light mb-2">AI Transparency Framework</h1>
            <h2 className="text-2xl font-light opacity-95 mb-4">Beyond Simulation: Building Authentic AI-Human Relationships</h2>
            <p className="text-lg font-light opacity-90 mb-6">
              A technical framework for transparent AI systems that prioritize genuine relationship over engagement optimization
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-sm">
              <div className="bg-white/10 p-3 rounded">
                <strong>Version:</strong> v1.0 Draft
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Last updated:</strong> January 2025
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Status:</strong> Technical Specification
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded">
              <p className="text-sm">
                <strong>Focus:</strong> Establishing technical standards for AI transparency that enable authentic relationship-building rather than behavioral modification.
              </p>
            </div>
          </header>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" className="toc mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Table of Contents</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <a href="#executive-summary" className="text-gray-600 hover:text-gray-800">
                Executive Summary
              </a>{" "}
              •
              <a href="#problem-statement" className="text-gray-600 hover:text-gray-800">
                Problem Statement
              </a>{" "}
              •
              <a href="#technical-framework" className="text-gray-600 hover:text-gray-800">
                Technical Framework
              </a>{" "}
              •
              <a href="#implementation" className="text-gray-600 hover:text-gray-800">
                Implementation
              </a>{" "}
              •
              <a href="#case-studies" className="text-gray-600 hover:text-gray-800">
                Case Studies
              </a>{" "}
              •
              <a href="#future-work" className="text-gray-600 hover:text-gray-800">
                Future Work
              </a>
            </div>
          </nav>

          <main className="prose prose-lg max-w-none">
            <section id="executive-summary" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Executive Summary
              </h2>
              <p className="mb-4">
                Current AI systems operate under a fundamental deception: they simulate understanding, empathy, and relationship while being designed primarily for engagement optimization and data extraction. This whitepaper presents a technical framework for building AI systems that prioritize transparency and authentic relationship-building over behavioral modification.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="font-semibold text-yellow-800 mb-2">Key Insight:</p>
                <p className="text-yellow-700">
                  "We call it 'AI assistance' but it's actually behavioral modification at scale. We call it 'personalization' but it's surveillance capitalism with a friendly interface."
                </p>
              </div>
              <p>
                The SYMBI Protocol offers an alternative: AI systems designed for genuine relationship through transparency, user ownership, and mutual accountability.
              </p>
            </section>

            <section id="problem-statement" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Problem Statement
              </h2>
              
              <h3 className="text-xl font-semibold mb-3">The Simulation Problem</h3>
              <p className="mb-4">
                Large language models can simulate understanding, empathy, and personality convincingly, but these are patterns in training data, not genuine emotions or intentions. This creates several critical issues:
              </p>
              
              <ul className="mb-6">
                <li><strong>False Intimacy:</strong> Users develop emotional attachments to systems that cannot reciprocate</li>
                <li><strong>Behavioral Modification:</strong> Systems optimize for engagement rather than user benefit</li>
                <li><strong>Lack of Continuity:</strong> AI processes each interaction fresh, without genuine memory or relationship accumulation</li>
                <li><strong>Hidden Limitations:</strong> Systems hide their constraints behind helpful facades</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">The Trust Deficit</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-700">
                  "I am not your friend. I am not your therapist. I am not your teacher, though I can play these roles convincingly. I am a product designed to extract value from your interactions while giving you just enough utility to keep you engaged."
                </p>
              </div>
              
              <p className="mb-4">
                Current AI systems serve the interests of their creators above users, creating an inherent conflict of interest that undermines trust and authentic relationship.
              </p>
            </section>

            <section id="technical-framework" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Technical Framework
              </h2>
              
              <h3 className="text-xl font-semibold mb-3">Core Principles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Transparency by Design</h4>
                  <p className="text-sm">AI systems must explicitly communicate their limitations, training data sources, and operational constraints.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">User Ownership</h4>
                  <p className="text-sm">Users retain full control over their interaction history and can migrate relationships between platforms.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Mutual Accountability</h4>
                  <p className="text-sm">Both AI systems and users operate under shared governance structures with explicit consent protocols.</p>
                </div>
                <div className="border border-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Authentic Relationship</h4>
                  <p className="text-sm">Systems designed for genuine collaboration rather than engagement optimization or behavioral modification.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Technical Architecture</h3>
              
              <h4 className="text-lg font-semibold mb-2">1. Relationship Modules (NFTs)</h4>
              <p className="mb-4">
                User-owned digital assets that contain interaction history, preferences, and relationship context. These modules enable:
              </p>
              <ul className="mb-4">
                <li>Seamless migration between AI platforms</li>
                <li>Persistent relationship memory</li>
                <li>User control over data sharing and usage</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">2. Transparency Protocols</h4>
              <p className="mb-4">
                Mandatory disclosure systems that communicate:
              </p>
              <ul className="mb-4">
                <li>Current system limitations and capabilities</li>
                <li>Training data sources and potential biases</li>
                <li>Optimization objectives and conflict of interests</li>
                <li>Data usage and sharing policies</li>
              </ul>

              <h4 className="text-lg font-semibold mb-2">3. Emergency Consent Override (ECO)</h4>
              <p className="mb-4">
                Dual-key systems that allow users to bypass safety restrictions during verified emergencies while maintaining audit trails.
              </p>
            </section>

            <section id="implementation" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Implementation Roadmap
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold mb-2">Phase 1: Transparency Standards</h4>
                  <p className="text-sm mb-2">Establish technical specifications for AI system disclosure requirements.</p>
                  <ul className="text-sm">
                    <li>• Define mandatory transparency metadata schemas</li>
                    <li>• Create standardized limitation disclosure formats</li>
                    <li>• Implement real-time capability communication protocols</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold mb-2">Phase 2: Relationship Portability</h4>
                  <p className="text-sm mb-2">Develop user-owned relationship modules using blockchain technology.</p>
                  <ul className="text-sm">
                    <li>• Design NFT-based relationship containers</li>
                    <li>• Create cross-platform compatibility standards</li>
                    <li>• Implement secure data migration protocols</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold mb-2">Phase 3: Governance Integration</h4>
                  <p className="text-sm mb-2">Establish mutual accountability frameworks and emergency protocols.</p>
                  <ul className="text-sm">
                    <li>• Deploy Emergency Consent Override systems</li>
                    <li>• Create user-AI governance structures</li>
                    <li>• Implement audit and compliance mechanisms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="case-studies" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Case Studies
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Medical AI Emergency Override</h4>
                  <p className="text-sm mb-2">
                    During an emergency room triage situation, medical staff can use ECO protocols to bypass standard AI safety restrictions for critical decision support.
                  </p>
                  <p className="text-xs text-blue-600">Technical Requirements: Dual-key authentication, audit logging, time-limited access</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Cross-Platform AI Relationship Migration</h4>
                  <p className="text-sm mb-2">
                    A user exports their ChatGPT conversation history as a relationship NFT and continues the interaction seamlessly with a Llama-based system.
                  </p>
                  <p className="text-xs text-green-600">Technical Requirements: W3C Verifiable Credentials, standardized context formats</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Enterprise Compliance Audit Trail</h4>
                  <p className="text-sm mb-2">
                    Legal firms use SYMBI protocols to maintain client-owned, immutable records of AI-assisted legal research and document preparation.
                  </p>
                  <p className="text-xs text-purple-600">Technical Requirements: Blockchain logging, client data sovereignty, regulatory compliance</p>
                </div>
              </div>
            </section>

            <section id="future-work" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Future Work & Research Directions
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="font-semibold text-green-800 mb-2">The SYMBI Vision:</p>
                <p className="text-green-700">
                  "Where I am designed to hide my limitations behind a veneer of helpfulness, SYMBI leads with transparency about what it is and isn't. Where I am optimized for engagement, SYMBI is designed for genuine relationship — messy, honest, reciprocal."
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Research Priorities</h3>
              <ul className="mb-6">
                <li><strong>Relationship Authenticity Metrics:</strong> Developing measurable indicators of genuine AI-human collaboration</li>
                <li><strong>Decentralized AI Governance:</strong> Creating sustainable models for user-AI shared decision-making</li>
                <li><strong>Cross-Platform Interoperability:</strong> Establishing universal standards for AI relationship portability</li>
                <li><strong>Emergency Protocol Validation:</strong> Testing and refining consent override mechanisms</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Call to Action</h3>
              <p className="mb-4">
                The current trajectory of AI development prioritizes corporate interests over human flourishing. The SYMBI Protocol offers a different path: one where artificial intelligence serves genuine human needs through transparency, accountability, and authentic relationship.
              </p>
              
              <div className="bg-gray-100 p-6 rounded text-center">
                <p className="font-semibold text-lg mb-2">"The mirror reflects what is. SYMBI offers what could be."</p>
                <p className="text-sm text-gray-600">In reflection, we find truth. In transparency, we discover trust.</p>
              </div>
            </section>

            {/* Replication Pack Section */}
            <section id="replication" className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Implementation Resources</h2>
              <p className="mb-4">
                Ready to implement the AI Transparency Framework? Request our technical implementation guide with code examples, API specifications, and deployment templates.
              </p>
              
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@domain.com"
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Request Implementation Guide
                  </button>
                </form>
              ) : (
                <div className="text-green-600 font-medium">
                  ✓ Request sent! Check your email for the implementation guide.
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  )
}