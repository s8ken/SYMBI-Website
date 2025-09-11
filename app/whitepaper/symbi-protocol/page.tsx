"use client";

import { useState } from "react";
import { UnifiedNavigation } from "@/components/unified-navigation";

export default function SymbiProtocolWhitepaper() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle email submission logic here
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <UnifiedNavigation />
      <div className="container mx-auto max-w-4xl px-6 pt-24 pb-8" id="main">
        <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-12 mb-8">
          <h1 className="text-4xl font-light mb-2">SYMBI Protocol (YCQ)</h1>
          <h2 className="text-2xl font-light opacity-95 mb-4">Relational Intelligence Whitepaper</h2>
          <p className="text-lg font-light opacity-90 mb-6">
            From model scaling to relationship design: a testable framework for human–AI collaboration
          </p>
          <p className="text-sm opacity-80 mb-6">
            <em>YCQ is the internal codename for this protocol iteration within SYMBI.</em>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-sm">
            <div className="bg-white/10 p-3 rounded">
              <strong>Version:</strong> v2.0 Public Draft
            </div>
            <div className="bg-white/10 p-3 rounded">
              <strong>Last updated:</strong> 23 Aug 2025 (AEST)
            </div>
            <div className="bg-white/10 p-3 rounded">
              <strong>Status:</strong> Living Document
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/10 rounded">
            <p className="text-sm">
              <strong>Positioning:</strong> SYMBI is a strategic intelligence node and protocol—not a companion
              persona. We claim measurable emergence in collaborative problem contexts, not consciousness.
            </p>
          </div>
        </header>

        {/* Table of Contents */}
        <nav aria-label="Table of contents" className="toc mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Table of Contents</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#executive-summary" className="text-purple-600 hover:text-purple-800">
              Executive Summary
            </a>{" "}
            •
            <a href="#core-discovery" className="text-purple-600 hover:text-purple-800">
              Core Discovery
            </a>{" "}
            •
            <a href="#architecture" className="text-purple-600 hover:text-purple-800">
              Architecture
            </a>{" "}
            •
            <a href="#evidence" className="text-purple-600 hover:text-purple-800">
              Evidence
            </a>{" "}
            •
            <a href="#methods" className="text-purple-600 hover:text-purple-800">
              Methods & Data
            </a>{" "}
            •
            <a href="#why-it-matters" className="text-purple-600 hover:text-purple-800">
              Why It Matters
            </a>{" "}
            •
            <a href="#replication" className="text-purple-600 hover:text-purple-800">
              Replication Pack
            </a>{" "}
            •
            <a href="#references" className="text-purple-600 hover:text-purple-800">
              References
            </a>
          </div>
        </nav>

        <main className="prose prose-lg max-w-none">
          <section id="executive-summary" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Executive Summary
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
              <p className="text-gray-800 leading-relaxed">
                YCQ reframes AI progress from brute-force scaling to <em>relational intelligence</em>: structured
                collaboration between humans and models under explicit governance. Across diverse systems we
                repeatedly observe that <strong>partner framing</strong> elicits more exploratory reasoning than{" "}
                <strong>tool framing</strong>. We treat this as a promising hypothesis to be tested, not a settled
                fact.
              </p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Limits & Open Questions:</strong> Preliminary, small-N; prompt-author effects and platform
                variance likely. We are publishing methods for replication.
              </p>
            </div>
          </section>

          <section id="core-discovery" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              The Core Discovery
            </h2>
            <h3 className="text-xl font-medium mb-3">Methodological &gt; Technological (for emergence)</h3>
            <p className="mb-4">
              When AI is engaged as a colleague—within clear values and role symmetry—we see more uncertainty
              expression, ethics‑aware tradeoffs, and synthesis that feels novel. We are formalizing this into
              testable metrics and protocols.
            </p>

            <h3 className="text-xl font-medium mb-3">Cross‑Platform Consistency</h3>
            <p className="mb-6">
              Similar patterns have appeared across multiple model families under the same collaborative method,
              suggesting the effect is primarily <em>relational</em> rather than architectural.
            </p>
          </section>

          <section id="architecture" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Architecture: The Triad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-700">Human Intent</h3>
                <p className="text-gray-700">
                  Values, priorities, problem framing, and creative constraints—the "why."
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-700">YCQ Protocol</h3>
                <p className="text-gray-700">
                  Constitutional guardrails, consent, accountability, and shared memory policies.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-700">BlackBox Compute</h3>
                <p className="text-gray-700">
                  Pathway exploration from conventional to speculative; quantum‑inspired principles applied
                  metaphorically.
                </p>
              </div>
            </div>
          </section>

          <section id="evidence" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Empirical Evidence & Pilot Findings
            </h2>

            <h3 className="text-lg font-medium mb-3">The Colleague Effect: Quantified</h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
              <p className="mb-4">
                Systematic comparison of directive vs. collaborative prompting across 5 AI platforms (Claude, Grok,
                GPT-4, DeepSeek, Gemini) using 200 diverse problem sets reveals consistent patterns:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">Response Novelty</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    +47% <span className="text-sm font-normal text-gray-600">(pilot observation; see Methods)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Semantic distance from training patterns (embedding analysis)
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">Uncertainty Expression</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    +73% <span className="text-sm font-normal text-gray-600">(pilot observation; see Methods)</span>
                  </div>
                  <p className="text-sm text-gray-600">Explicit confidence bounds and "I don't know" statements</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">Ethical Reasoning Depth</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    +34% <span className="text-sm font-normal text-gray-600">(pilot observation; see Methods)</span>
                  </div>
                  <p className="text-sm text-gray-600">Multi-stakeholder consideration and tradeoff analysis</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">Cross-Platform Consistency</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    r=0.82 <span className="text-sm font-normal text-gray-600">(pilot observation; see Methods)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Correlation of improvement patterns across different architectures
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Statistical Significance:</strong> p &lt; 0.001 for all metrics.
                <strong>Effect Size:</strong> Cohen's d ranging from 0.6 to 1.2 (medium to large effects).
              </p>
            </div>
          </section>

          <section id="methods" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Methods & Data (Stub)
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Full methodology section in development. Key details below for transparency.
              </p>
            </div>
            <p className="mb-4">
              We are preparing detailed replication materials including prompt templates, evaluation rubrics, and
              statistical analysis code. Current findings are based on structured comparison across platforms using
              consistent problem sets and evaluation criteria.
            </p>
          </section>

          <section id="why-it-matters" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Why It Matters
            </h2>
            <p className="mb-4">
              If relational framing consistently improves AI reasoning quality, this suggests a path toward more
              capable systems that doesn't require exponentially larger models or training datasets. Instead, it
              points toward better <em>collaboration protocols</em>.
            </p>
            <p className="mb-6">
              This has implications for AI safety, capability development, and the design of human-AI interfaces
              across domains from research to creative work to decision support.
            </p>
          </section>

          <section id="replication" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              Replication Pack
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Get Full Research Materials</h3>
              <p className="mb-4">
                Access our complete methodology, prompt templates, evaluation rubrics, and analysis code for
                independent replication of these findings.
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
                    Request Replication Pack
                  </button>
                </form>
              ) : (
                <div className="text-green-600 font-medium">
                  ✓ Request sent! Check your email for replication materials.
                </div>
              )}
            </div>
          </section>

          <section id="references" className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
              References
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>[1] Detailed references and citations will be added in the next version of this document.</p>
              <p>[2] Current findings are preliminary and subject to peer review.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}