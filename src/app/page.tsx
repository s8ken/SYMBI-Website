import Link from "next/link";
import { CONSOLE_URL } from "@/lib/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-stone-800">YCQ Sonate</div>
              <div className="ml-2 text-sm text-stone-600">Why Seek You</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#platform" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium">
                  Platform
                </Link>
                <Link href="/technology" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium">
                  Technology
                </Link>
                <Link href="/investors" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium">
                  Investors
                </Link>
                <Link href="#demo" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium">
                  Demo
                </Link>
                <Link href={CONSOLE_URL} target="_blank" className="bg-stone-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stone-900">
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4">
              YCQ Sonate
            </h1>
            <h2 className="text-2xl md:text-3xl text-amber-700 mb-6 font-semibold">
              Where audit meets orchestration.
            </h2>
            <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
              Trust-first AI orchestration with cryptographic audit trails and fairness-aware QA across OpenAI, Anthropic, and more. 
              Prove integrity—then scale what resonates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={CONSOLE_URL} target="_blank" className="bg-stone-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-stone-900 transition-colors">
                Try Live Demo
              </Link>
              <button className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-green-700 transition-colors">
                1-Click Ledger Verify
              </button>
              <Link href="#trust-receipts" className="border border-stone-300 text-stone-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-stone-50 transition-colors">
                View Trust Receipts
              </Link>
            </div>
            
            {/* Sonate Product Pillars */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="#sonate-ledger" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span><strong>Sonate Ledger</strong> • Cryptographic audit trails</span>
              </Link>
              <Link href="#sonate-guardrails" className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span><strong>Sonate Guardrails</strong> • Policy enforcement</span>
              </Link>
              <Link href="#sonate-roundtable" className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span><strong>Sonate Roundtable</strong> • Fairness-aware QA</span>
              </Link>
              <Link href="#sonate-capsules" className="flex items-center space-x-2 text-amber-600 hover:text-amber-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2m0 0h14m-14 0a2 2 0 002 2v2a2 2 0 01-2 2" />
                </svg>
                <span><strong>Sonate Capsules</strong> • Context orchestration</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* YCQ Sonate Platform Section */}
      <section className="py-20 bg-white scroll-mt-24" id="platform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              The YCQ Sonate Platform
            </h2>
            <p className="text-xl text-stone-600 mb-6 max-w-3xl mx-auto">
              Trust first. Then scale what resonates.
            </p>
            <p className="text-lg text-stone-700 max-w-4xl mx-auto">
              Enterprise AI trust and compliance orchestration: cryptographic audit trails, fairness-aware QA (AI vs human), and vendor-agnostic guardrails across all AI-powered business operations.
            </p>
          </div>

          {/* Sample Metrics Card */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">88%</div>
                <div className="text-sm text-stone-600">FAR-A</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">84%</div>
                <div className="text-sm text-stone-600">FAR-H</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">+1.18×</div>
                <div className="text-sm text-stone-600">PFI</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">99.3%</div>
                <div className="text-sm text-stone-600">TIS</div>
              </div>
            </div>
          </div>
          <div className="text-center mb-16">
            <Link href="/metrics-methodology" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View methodology & assumptions →
            </Link>
          </div>

          {/* Trust Receipts Section */}
          <div className="mb-16" id="trust-receipts">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-8">Trust Receipts</h3>
            <div className="bg-stone-900 p-6 rounded-lg">
              <h4 className="text-white text-lg font-semibold mb-4">Sample Orchestration Receipt</h4>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "receipt_id": "rcpt_2024_0907_15h23m_a7f8b2",
  "timestamp": "2024-09-07T15:23:41.892Z",
  "user_query": "Analyze this customer complaint for sentiment",
  "agents_considered": [
    {
      "provider": "openai",
      "model": "gpt-4o",
      "trust_score": 0.94,
      "capability_match": 0.87
    },
    {
      "provider": "anthropic", 
      "model": "claude-3-5-sonnet",
      "trust_score": 0.91,
      "capability_match": 0.92
    }
  ],
  "chosen_agent": {
    "provider": "anthropic",
    "model": "claude-3-5-sonnet", 
    "rationale": "Higher capability match for sentiment analysis + compliance requirement met"
  },
  "guardrails_applied": [
    "pii_detection",
    "sentiment_threshold_check", 
    "escalation_policy_soc2"
  ],
  "outcome": "completed",
  "human_involvement": false,
  "audit_hash": "sha256:7f9a2b8c3d4e5f6g7h8i9j0k1l2m3n4o",
  "verified": true
}`}
              </pre>
            </div>
            <p className="text-center mt-4 text-stone-600 text-sm">
              Every AI interaction generates an immutable receipt showing decision reasoning and audit trail
            </p>
          </div>

          {/* For Investors Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg mb-16">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-6">For Investors</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-bold text-stone-900 mb-2">Market Size</h4>
                <p className="text-stone-600 text-sm mb-3">$62B TAM in AI trust & compliance infrastructure, driven by regulatory mandates and enterprise adoption</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-stone-900 mb-2">Why Now</h4>
                <p className="text-stone-600 text-sm mb-3">EU AI Act enforcement, SEC disclosure requirements, and high-profile AI incidents creating immediate demand</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-stone-900 mb-2">Proof</h4>
                <p className="text-stone-600 text-sm mb-3">95% test coverage, production-ready platform, live demo with cryptographic verification</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/investors" className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors">
                Full Investment Overview →
              </Link>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-stone-50 p-6 rounded-lg" id="sonate-ledger">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Sonate Ledger</h3>
              <p className="text-stone-600">
                Append-only, hash-chained ledger with one-click integrity verify and orchestration receipts (who/what/why).
              </p>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg" id="sonate-roundtable">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Sonate Roundtable</h3>
              <p className="text-stone-600">
                Separate KPIs for AI-only vs AI↔Human flows; normalize by complexity mix so humans aren&apos;t penalized for complex cases requiring expertise.
              </p>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg" id="sonate-guardrails">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Sonate Guardrails</h3>
              <p className="text-stone-600">
                Thresholds that trigger apology/continuity, escalation, or human approval—across OpenAI, Anthropic, and more.
              </p>
            </div>
          </div>

          {/* How It Works - 4 Steps */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2">Ingest</h4>
                <p className="text-stone-600 text-sm">
                  Capture each turn (prompt/response, model, config) into a tamper-evident ledger.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2">Measure</h4>
                <p className="text-stone-600 text-sm">
                  Compute dual-track KPIs (AI-only vs Human-involved), Learning Opportunity Index, Fairness Index across all business processes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2">Govern</h4>
                <p className="text-stone-600 text-sm">
                  Enforce trust thresholds and approvals; write receipts explaining decisions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2" id="sonate-capsules">Resonate</h4>
                <p className="text-stone-600 text-sm">
                  Add Context Capsules (goals, tone, constraints) to improve outcomes after trust is proven.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics We Expose */}
          <div className="bg-stone-50 p-8 rounded-lg mb-16">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-8">Metrics We Expose</h3>
            <div className="grid md:grid-cols-5 gap-6 text-center">
              <div className="group relative">
                <div className="text-lg font-semibold text-stone-900">FAR-A / FAR-H</div>
                <div className="text-sm text-stone-600">First-attempt resolution</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  First-attempt resolution (AI-only vs human-involved)
                </div>
              </div>
              <div className="group relative">
                <div className="text-lg font-semibold text-stone-900">Escalation Δ</div>
                <div className="text-sm text-stone-600">Change in escalation</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Change in escalation rate when humans are added
                </div>
              </div>
              <div className="group relative">
                <div className="text-lg font-semibold text-stone-900">LOI</div>
                <div className="text-sm text-stone-600">Learning Opportunity</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Learning Opportunity Index (routine tasks automated per process)
                </div>
              </div>
              <div className="group relative">
                <div className="text-lg font-semibold text-stone-900">PFI</div>
                <div className="text-sm text-stone-600">Process Fairness</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Fairness-adjusted performance score that accounts for complexity mix and learning opportunities
                </div>
              </div>
              <div className="group relative">
                <div className="text-lg font-semibold text-stone-900">TIS</div>
                <div className="text-sm text-stone-600">Trust Integrity</div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  % of sampled sessions whose hash-chain verified successfully
                </div>
              </div>
            </div>
          </div>

          {/* Security & Ops Badges */}
          <div className="text-center mb-16">
            <h3 className="text-xl font-semibold text-stone-900 mb-6">Security & Operations</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">JWT/RBAC</span>
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">Webhook HMAC</span>
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">CORS allowlist</span>
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">/healthz & /readyz</span>
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">/metrics (Prometheus)</span>
              <span className="bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-sm">Structured logs</span>
            </div>
            <div className="flex justify-center">
              <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                🏛️ Provisional Patent Filed (Australia)
              </span>
            </div>
          </div>

          {/* For Your Team */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-stone-900 mb-3">Compliance & Risk</h4>
              <p className="text-stone-600">
                Board-ready reports, immutable audit trails, approvals, attribution (AI vs human) for any AI-powered business process.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-stone-900 mb-3">Engineering & Ops</h4>
              <p className="text-stone-600">
                Multi-model adapters, decision receipts, Grafana/Loki dashboards, VS Code extension for enterprise AI operations.
              </p>
            </div>
          </div>

          {/* Proof Elements */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-8 rounded-lg text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Link href="https://symbi-synergy-pa9k82n5m-ycq.vercel.app" target="_blank" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block">
                  Live Verify Demo
                </Link>
                <p className="text-stone-300 text-sm mt-2">Test hash-chain integrity</p>
              </div>
              <div className="text-stone-300">
                <div className="text-lg font-semibold mb-2">🔒 Security Callout</div>
                <p className="text-sm">No vendor keys on client. All provider keys server-side.</p>
              </div>
              <div>
                <a href="/YCQ_Sonate_UAT_Report.md" download className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors inline-block">
                  Download UAT Report
                </a>
                <p className="text-stone-300 text-sm mt-2">Full technical documentation</p>
              </div>
            </div>
            
            <div className="border-t border-stone-600 pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready for a Trust-First Pilot?
              </h3>
              <p className="text-stone-300 mb-6">
                Start a 60-day Trust-First pilot with your existing AI-powered business processes.
              </p>
              <Link href="mailto:stephen@yseeku.com?subject=60-day Trust-First Pilot" className="bg-amber-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-700 transition-colors">
                Book a 30-min scoping call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-stone-50" id="technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Enterprise-Grade AI Trust Infrastructure
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Built by a solo founder with no development background in 7 months. 
              Demonstrates exceptional technical capability and comprehensive understanding of enterprise AI trust requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Technical Achievements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Sonate Ledger</h4>
                    <p className="text-stone-600">Ed25519 signatures, hash-chain verification, immutable audit trails</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Sonate Guardrails</h4>
                    <p className="text-stone-600">OpenAI, Anthropic, Perplexity with unified API and policy enforcement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Sonate Roundtable</h4>
                    <p className="text-stone-600">Fairness-aware QA, behavioral analysis, change-point detection, trust scoring</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Sonate Capsules</h4>
                    <p className="text-stone-600">Context orchestration, goals/tone/constraints, CX optimization after trust is proven</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-stone-900 mb-4">Live Demo Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Response Time</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">~100ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Security Grade</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">A+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">API Endpoints</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">18+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Test Coverage</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Lines of Code</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">18K+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Experience YCQ Sonate Live
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              See the platform in action. Complete with Sonate Ledger verification, Sonate Guardrails, 
              and enterprise-grade orchestration.
            </p>
          </div>
          
          <div className="bg-stone-800 rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">Live Demo Available</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for Investor Demonstrations
            </h3>
            <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
              Professional deployment showcasing enterprise capabilities, 
              security implementation, and technical sophistication.
            </p>
            <Link href={CONSOLE_URL} target="_blank" className="bg-amber-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-700 transition-colors">
              Launch Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              The Founder Journey
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From zero development experience to enterprise-grade platform in 7 months. 
              Demonstrates exceptional execution capability and market insight.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <blockquote className="text-lg text-stone-700 italic mb-6">
                &ldquo;I put my life on hold for 7 months to build this. Starting with no development background, 
                I taught myself everything needed to create enterprise-grade AI trust infrastructure. 
                The result is a production-ready platform that solves real problems in the rapidly expanding AI trust and compliance market.&rdquo;
              </blockquote>
              <div className="text-stone-600">
                <p className="font-semibold">Stephen YCQ Sonate</p>
                <p>Founder, YCQ Sonate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discuss Investment?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            YCQ Sonate represents a compelling opportunity in the AI trust and compliance infrastructure market. 
            Let&apos;s discuss how we can scale this technology across enterprise AI operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:stephen@yseeku.com" className="bg-amber-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-700 transition-colors">
              Contact for Investment
            </Link>
            <Link href={CONSOLE_URL} target="_blank" className="border border-stone-300 text-stone-300 px-8 py-3 rounded-md text-lg font-medium hover:bg-stone-700 transition-colors">
              Try Demo First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
