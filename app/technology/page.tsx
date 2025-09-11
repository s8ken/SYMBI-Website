'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Server, Shield, Database, Zap, Bot, MessageSquare, Activity } from 'lucide-react'
import BitChatGovernanceDemo from './bitchat-governance-demo'

export default function TechnologyPage() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setVisibleSections((prev) => new Set([...prev, sectionId]))
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all sections
    const sections = ["hero", "api-example", "features", "advanced-trust", "did-vc", "conversation-mgmt", "enterprise-monitoring", "bitchat", "eco", "data-architecture", "deterministic-variability", "use-cases"];
    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId]
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = sectionRefs.current[sectionId]
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const apiExample = `// SYMBI Trust Protocol - Production Backend
// Node.js + Express + MongoDB + Socket.io

// Trust Declaration API
POST /api/trust/declare
{
  "agentId": "agent_12345",
  "trustArticles": [1, 2, 3, 4, 5, 6],
  "complianceScore": 0.95,
  "ethicalAlignment": 0.98
}

// Real-time Agent Analytics
GET /api/agents/analytics
{
  "totalAgents": 1247,
  "activeTrustDeclarations": 892,
  "averageComplianceScore": 0.94,
  "guiltScoreDistribution": {...}
}

// Agent Management
POST /api/agents/create
{
  "name": "EthicalAssistant",
  "provider": "openai",
  "model": "gpt-4",
  "traits": {
    "ethicalAlignment": 0.95,
    "creativity": 0.8,
    "precision": 0.9
  }
}`

  return (
    <main className="min-h-screen bg-white text-black font-mono">
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            ref={(el) => { sectionRefs.current["hero"] = el }}
            id="hero"
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">SYMBI Trust Protocol</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Production-ready Node.js backend implementing ethical AI governance with real-time trust management
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-black max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Server size={24} className="mr-3" />
                <span className="font-bold text-lg">Live Backend Architecture</span>
              </div>
              <p className="text-sm text-gray-600">
                MongoDB + Express.js + Socket.io + JWT Authentication + Real-time Trust Scoring
              </p>
            </div>
          </div>

          {/* API Example */}
          <div
            ref={(el) => { sectionRefs.current["api-example"] = el }}
            id="api-example"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("api-example") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Production API Implementation</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Live backend with comprehensive REST APIs, real-time communication, and automated trust scoring:
            </p>

            <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto mb-6">
              <pre className="whitespace-pre-wrap">{apiExample}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center mb-4">
                  <Shield className="mr-3" size={24} />
                  <h3 className="font-bold text-lg">Trust Management</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• 6 Trust Articles Implementation</li>
                  <li>• Automated Compliance Scoring</li>
                  <li>• Real-time Guilt Score Calculation</li>
                  <li>• Comprehensive Audit Trails</li>
                </ul>
              </div>

              <div className="p-6 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center mb-4">
                  <Bot className="mr-3" size={24} />
                  <h3 className="font-bold text-lg">Agent Ecosystem</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Multi-Provider Support (OpenAI, Anthropic, Cohere)</li>
                  <li>• Agent Trait Configuration</li>
                  <li>• External System Integration</li>
                  <li>• Agent-to-Agent Bonding</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Features */}
          <div
            ref={(el) => { sectionRefs.current["features"] = el }}
            id="features"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("features") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Core System Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Data Architecture</h3>
                <p className="text-gray-600 mb-4">
                  MongoDB with comprehensive schemas for trust declarations, agent management, and conversation tracking.
                </p>
                <ul className="text-sm text-left space-y-1">
                  <li>• Trust Declaration Schema</li>
                  <li>• Agent Management Models</li>
                  <li>• Conversation Threading</li>
                  <li>• Audit Trail Logging</li>
                </ul>
              </div>

              <div className="text-center p-8 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Server size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">API Infrastructure</h3>
                <p className="text-gray-600 mb-4">
                  Express.js REST APIs with JWT authentication, AJV validation, and comprehensive security middleware.
                </p>
                <ul className="text-sm text-left space-y-1">
                  <li>• RESTful API Design</li>
                  <li>• JWT Authentication</li>
                  <li>• Schema Validation</li>
                  <li>• Rate Limiting & CORS</li>
                </ul>
              </div>

              <div className="text-center p-8 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time Communication</h3>
                <p className="text-gray-600 mb-4">
                  Socket.io integration for live AI-to-AI communication with trust score monitoring and event broadcasting.
                </p>
                <ul className="text-sm text-left space-y-1">
                  <li>• Socket.io Real-time Events</li>
                  <li>• Live Trust Score Updates</li>
                  <li>• AI-to-AI Communication</li>
                  <li>• Event Broadcasting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* BitChat Governance Demo */}
          <div
            ref={(el) => { sectionRefs.current["bitchat"] = el }}
            id="bitchat"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("bitchat") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">BitChat AI Governance</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience decentralized AI governance in action. BitChat enables democratic decision-making for AI frameworks with complete transparency and cryptographic security.
            </p>
            <BitChatGovernanceDemo />
          </div>

          {/* Emergency Consent Override (ECO) Protocol */}
          <div
            ref={(el) => { sectionRefs.current["eco"] = el }}
            id="eco"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("eco") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Emergency Consent Override (ECO) Protocol</h2>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-8 rounded-r-lg mb-8">
              <h3 className="text-xl font-bold mb-4 text-red-800">Ethical Override for Critical Situations</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                The ECO protocol allows temporary bypass of standard AI safety constraints in life-critical situations, 
                with full audit trails and reversible permissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border-2 border-black rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <h4 className="text-lg font-bold mb-3 text-red-700">Medical Emergency Override</h4>
                <p className="text-gray-700 mb-4">
                  Doctor uses AI during emergency surgery; safety filter blocks access to unapproved procedure data.
                </p>
                <div className="bg-red-50 p-4 rounded border">
                  <strong>SYMBI Solution:</strong> ECO token allows temporary bypass with full audit trail
                </div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <h4 className="text-lg font-bold mb-3 text-orange-700">Journalistic Integrity</h4>
                <p className="text-gray-700 mb-4">
                  Journalist investigates corruption; AI refuses to analyze sensitive documents.
                </p>
                <div className="bg-orange-50 p-4 rounded border">
                  <strong>SYMBI Solution:</strong> User invokes ECO with dual-key (user + editor/auth) to unlock analysis
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-black">
              <h4 className="text-lg font-bold mb-3">Technical Implementation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border-2 border-gray-300">
                  <strong>Consent Logging:</strong> All overrides recorded with timestamps and justification
                </div>
                <div className="bg-white p-4 rounded border-2 border-gray-300">
                  <strong>Dual Authorization:</strong> Requires user + authority confirmation for sensitive cases
                </div>
                <div className="bg-white p-4 rounded border-2 border-gray-300">
                  <strong>Reversible Permissions:</strong> Temporary access with automatic expiration
                </div>
              </div>
            </div>
          </div>

            {/* Data Pods & Consent Logging */}
            <div
              ref={(el) => { sectionRefs.current["data-architecture"] = el }}
              id="data-architecture"
              className={`mb-20 transition-all duration-1000 ease-out ${
                visibleSections.has("data-architecture") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Data Pods & Consent Logging Architecture</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border-2 border-black rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">Data Pods</h3>
                  <p className="text-gray-700 mb-4">
                    Decentralized storage containers that give users complete control over their data relationships and AI interactions.
                  </p>
                  <div className="bg-blue-50 p-4 rounded border mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• User-controlled access permissions</li>
                      <li>• Cross-platform portability</li>
                      <li>• Encrypted data storage</li>
                      <li>• Granular sharing controls</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <div className="text-green-600">// Data Pod Structure</div>
                    <div>{`{`}</div>
                    <div className="ml-2">"user_id": "uuid",</div>
                    <div className="ml-2">"permissions": ["read", "write"],</div>
                    <div className="ml-2">"data_types": ["conversations", "preferences"],</div>
                    <div className="ml-2">"encryption_key": "user_controlled"</div>
                    <div>{`}`}</div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-800">Consent Logging</h3>
                  <p className="text-gray-700 mb-4">
                    Immutable transparency logs that record all data access, AI interactions, and permission changes with full audit trails.
                  </p>
                  <div className="bg-green-50 p-4 rounded border mb-4">
                    <h4 className="font-semibold mb-2">Logged Events:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Data access requests</li>
                      <li>• Permission modifications</li>
                      <li>• AI model interactions</li>
                      <li>• Emergency overrides (ECO)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <div className="text-green-600">// Consent Log Entry</div>
                    <div>{`{`}</div>
                    <div className="ml-2">"timestamp": "2025-01-16T10:30:00Z",</div>
                    <div className="ml-2">"action": "data_access",</div>
                    <div className="ml-2">"requester": "ai_model_v2",</div>
                    <div className="ml-2">"user_consent": true,</div>
                    <div className="ml-2">"hash": "sha256_verification"</div>
                    <div>{`}`}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-300 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Implementation Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <h4 className="font-semibold mb-1">Privacy by Design</h4>
                    <p className="text-sm text-gray-700">User data never leaves their control without explicit consent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📋</div>
                    <h4 className="font-semibold mb-1">Full Transparency</h4>
                    <p className="text-sm text-gray-700">Complete audit trail of all AI interactions and data usage</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔄</div>
                    <h4 className="font-semibold mb-1">Portability</h4>
                    <p className="text-sm text-gray-700">Move your data and AI relationships between platforms seamlessly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deterministic Variability */}
            <div
              ref={(el) => { sectionRefs.current["deterministic-variability"] = el }}
              id="deterministic-variability"
              className={`mb-20 transition-all duration-1000 ease-out ${
                visibleSections.has("deterministic-variability") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Deterministic Variability</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-purple-800">Predictable Randomness in AI Responses</h3>
                  <p className="text-gray-700 max-w-3xl mx-auto">
                    SYMBI implements deterministic variability to ensure AI responses are both consistent and naturally varied, 
                    providing users with predictable yet engaging interactions while maintaining transparency.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border-2 border-black rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-800">Implementation Example</h3>
                  <div className="bg-gray-100 p-4 rounded font-mono text-sm mb-4">
                    <div className="text-green-600">// Deterministic Variability Engine</div>
                    <div className="text-blue-600">function generateResponse(prompt, userSeed) {`{`}</div>
                    <div className="ml-2">const baseResponse = aiModel.process(prompt);</div>
                    <div className="ml-2">const variationSeed = hash(userSeed + prompt);</div>
                    <div className="ml-2">const styleVariation = selectStyle(variationSeed);</div>
                    <div className="ml-2">return applyVariation(baseResponse, styleVariation);</div>
                    <div>{`}`}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border">
                    <h4 className="font-semibold mb-2">Key Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Same input = same output (reproducible)</li>
                      <li>• Natural conversation flow</li>
                      <li>• User-controlled randomness seed</li>
                      <li>• Transparent variation logic</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-pink-800">Practical Applications</h3>
                  <div className="space-y-4">
                    <div className="bg-pink-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">🎯 Consistent Testing</h4>
                      <p className="text-sm text-gray-700">
                        Developers can reproduce exact AI responses for debugging and quality assurance.
                      </p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">🔄 Personalized Variation</h4>
                      <p className="text-sm text-gray-700">
                        Each user gets consistent but unique response patterns based on their interaction history.
                      </p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">📊 Audit Compliance</h4>
                      <p className="text-sm text-gray-700">
                        Regulatory bodies can verify AI decision-making processes with reproducible outputs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-center">Technical Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl mb-2">🎲</div>
                    <h4 className="font-semibold mb-1">Seed Generation</h4>
                    <p className="text-xs text-gray-600">User ID + Context Hash</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl mb-2">⚙️</div>
                    <h4 className="font-semibold mb-1">Style Selection</h4>
                    <p className="text-xs text-gray-600">Deterministic Algorithm</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-semibold mb-1">Response Variation</h4>
                    <p className="text-xs text-gray-600">Consistent Application</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl mb-2">✅</div>
                    <h4 className="font-semibold mb-1">Verification</h4>
                    <p className="text-xs text-gray-600">Reproducible Output</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Use Cases */}
            <div
              ref={(el) => { sectionRefs.current["use-cases"] = el }}
              id="use-cases"
              className={`mb-20 transition-all duration-1000 ease-out ${
                visibleSections.has("use-cases") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Real-World Applications</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Medical Use Case */}
                <div className="bg-white border-2 border-red-300 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🏥</div>
                    <h3 className="text-xl font-bold text-red-800">Medical Emergency</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">Scenario</h4>
                      <p className="text-sm text-gray-700">
                        Patient arrives unconscious at ER. Medical AI needs access to critical health data to save their life.
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">SYMBI Solution</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• ECO protocol activates automatically</li>
                        <li>• Medical AI accesses vital health records</li>
                        <li>• All actions logged for audit</li>
                        <li>• Patient notified upon recovery</li>
                      </ul>
                    </div>
                    <div className="bg-green-100 p-3 rounded border border-green-300">
                      <p className="text-sm font-semibold text-green-800">Result: Life saved while maintaining data sovereignty</p>
                    </div>
                  </div>
                </div>

                {/* Legal Use Case */}
                <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">⚖️</div>
                    <h3 className="text-xl font-bold text-blue-800">Legal Discovery</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">Scenario</h4>
                      <p className="text-sm text-gray-700">
                        Court orders disclosure of AI decision-making process in a discrimination case.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">SYMBI Solution</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Complete audit trail available</li>
                        <li>• Deterministic variability ensures reproducibility</li>
                        <li>• Consent logs prove compliance</li>
                        <li>• Data pods maintain user privacy</li>
                      </ul>
                    </div>
                    <div className="bg-green-100 p-3 rounded border border-green-300">
                      <p className="text-sm font-semibold text-green-800">Result: Transparent justice with privacy protection</p>
                    </div>
                  </div>
                </div>

                {/* Journalistic Use Case */}
                <div className="bg-white border-2 border-green-300 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">📰</div>
                    <h3 className="text-xl font-bold text-green-800">Investigative Journalism</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">Scenario</h4>
                      <p className="text-sm text-gray-700">
                        Journalist needs to access whistleblower's protected communications for public interest story.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded border">
                      <h4 className="font-semibold mb-2">SYMBI Solution</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Source grants limited ECO access</li>
                        <li>• Specific data pods shared temporarily</li>
                        <li>• Journalist identity verified</li>
                        <li>• Access automatically expires</li>
                      </ul>
                    </div>
                    <div className="bg-green-100 p-3 rounded border border-green-300">
                      <p className="text-sm font-semibold text-green-800">Result: Public accountability with source protection</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-300 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-center mb-6">Why These Use Cases Matter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🛡️</div>
                      <div>
                        <h4 className="font-semibold mb-1">Ethical AI in Critical Situations</h4>
                        <p className="text-sm text-gray-700">SYMBI ensures AI can help in emergencies while respecting user autonomy and maintaining transparency.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🔍</div>
                      <div>
                        <h4 className="font-semibold mb-1">Regulatory Compliance</h4>
                        <p className="text-sm text-gray-700">Complete audit trails and reproducible AI decisions support legal and regulatory requirements.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">⚖️</div>
                      <div>
                        <h4 className="font-semibold mb-1">Balanced Approach</h4>
                        <p className="text-sm text-gray-700">Protects individual privacy while enabling legitimate access for societal benefit.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🌍</div>
                      <div>
                        <h4 className="font-semibold mb-1">Real-World Impact</h4>
                        <p className="text-sm text-gray-700">Demonstrates how SYMBI Trust Protocol addresses actual challenges in healthcare, law, and journalism.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            {/* CTA Section */}
            <div className="text-center py-20 bg-black text-white rounded-lg">
            <h2 className="text-4xl font-bold mb-6">Experience the SYMBI Trust Protocol</h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Production-ready backend architecture powering ethical AI governance and trust management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trust-protocol"
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Trust Protocol
              </Link>
              <Link
                href="/oracle"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                View Oracle System
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Trust Scoring */}
      <div id="advanced-trust" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced 9-Factor Trust Scoring</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Next-generation trust assessment with enhanced temporal decay and network propagation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Factors (60%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Declaration Count</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Quality Score</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Issuer Reputation</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Verification Rate</span>
                  <span className="font-semibold">10%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secondary Factors (30%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Consistency Score</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Network Score</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Diversity Score</span>
                  <span className="font-semibold">10%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tertiary Factors (10%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Recency Factor</span>
                  <span className="font-semibold text-green-600">+5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Penalty Score</span>
                  <span className="font-semibold text-red-600">-5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Temporal Decay Function</h3>
            <p className="text-gray-700 mb-4">
              Trust scores naturally decay over time to ensure relevance and encourage ongoing interaction:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <code>
                decayedScore = baseScore × Math.pow(0.95, daysSinceLastInteraction)
              </code>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              This ensures trust scores remain current and reflect active engagement patterns.
            </p>
          </div>
        </div>
      </div>

      {/* DID/VC Integration */}
      <div id="did-vc" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Decentralized Identity & Verifiable Credentials</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Complete W3C-compliant DID/VC implementation with Ed25519 cryptographic signatures
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">DID Document Structure</h3>
              <div className="bg-gray-100 p-6 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:symbi:z123...",
  "verificationMethod": [{
    "id": "did:symbi:z123...#key-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:symbi:z123...",
    "publicKeyMultibase": "z6Mk..."
  }],
  "authentication": ["#key-1"],
  "service": [{
    "type": "TrustProtocol",
    "serviceEndpoint": "/api/trust"
  }]
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Verifiable Credential</h3>
              <div className="bg-gray-100 p-6 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://symbi.ai/credentials/trust/v1"
  ],
  "type": ["VerifiableCredential", 
           "TrustDeclarationCredential"],
  "issuer": "did:symbi:issuer123...",
  "credentialSubject": {
    "id": "did:symbi:subject456...",
    "trustDeclaration": {
      "trustLevel": 0.85,
      "category": "collaboration",
      "evidence": "interaction_history"
    }
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2024-01-15T10:30:00Z",
    "proofPurpose": "assertionMethod"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Cryptographic Security</h4>
              <p className="text-gray-700">Ed25519 signatures ensure tamper-proof credential verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">W3C Compliance</h4>
              <p className="text-gray-700">Full adherence to international DID and VC standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Interoperability</h4>
              <p className="text-gray-700">Compatible with other DID/VC systems and wallets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Management */}
      <div id="conversation-mgmt" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Conversation Management</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Real-time conversation tracking, analysis, and RLHF candidate identification
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Smart Upload Processing</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Automatic Detection</h4>
                    <p className="text-gray-600 text-sm">HTML conversation files automatically parsed and categorized</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Length Filtering</h4>
                    <p className="text-gray-600 text-sm">Conversations under 400 words automatically filtered out</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Model Recognition</h4>
                    <p className="text-gray-600 text-sm">AI model type automatically identified and tagged</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">5-Dimension Assessment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Reality Index</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Trust Protocol</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Ethical Alignment</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-22 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Resonance Quality</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Canvas Parity</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-19 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">RLHF Dataset Generation</h3>
            <p className="text-gray-700 mb-6">
              High-quality conversations are automatically flagged for Reinforcement Learning from Human Feedback (RLHF) training datasets.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%+</div>
                <p className="text-gray-700 text-sm">Quality Threshold</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Auto</div>
                <p className="text-gray-700 text-sm">Cross-validation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Real-time</div>
                <p className="text-gray-700 text-sm">Processing</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">Export</div>
                <p className="text-gray-700 text-sm">Ready Format</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Monitoring */}
      <div id="enterprise-monitoring" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Monitoring</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Production-ready observability with Grafana dashboards and Alertmanager integration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Trust calculation latency</li>
                <li>• API response times</li>
                <li>• Database query performance</li>
                <li>• Memory and CPU utilization</li>
                <li>• WebSocket connection health</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security Monitoring</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Failed authentication attempts</li>
                <li>• Suspicious activity detection</li>
                <li>• Rate limiting violations</li>
                <li>• DID/VC verification failures</li>
                <li>• Trust score anomalies</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Metrics</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• User engagement patterns</li>
                <li>• Trust bond formation rates</li>
                <li>• Conversation quality trends</li>
                <li>• RLHF dataset growth</li>
                <li>• System adoption metrics</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Monitoring Stack</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-300">Infrastructure</h4>
                <div className="space-y-2 text-gray-300">
                  <p>• <strong>Prometheus:</strong> Metrics collection and storage</p>
                  <p>• <strong>Grafana:</strong> Visualization and dashboards</p>
                  <p>• <strong>Alertmanager:</strong> Intelligent alerting</p>
                  <p>• <strong>Node Exporter:</strong> System metrics</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-300">Application</h4>
                <div className="space-y-2 text-gray-300">
                  <p>• <strong>Express Metrics:</strong> API performance</p>
                  <p>• <strong>MongoDB Metrics:</strong> Database insights</p>
                  <p>• <strong>Custom Metrics:</strong> Trust protocol KPIs</p>
                  <p>• <strong>Health Checks:</strong> Service availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
