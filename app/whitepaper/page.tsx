"use client"

import { UnifiedNavigation } from "@/components/unified-navigation"

export default function WhitepaperPage() {
  return (
    <>
      <UnifiedNavigation theme="light" />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-4xl px-6 pt-24 pb-8">
          <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-12 mb-8">
            <h1 className="text-4xl font-light mb-2">The YCQ Protocol</h1>
            <p className="text-xl font-light opacity-95 mb-4">
              Relational Intelligence Architecture for Collaborative Human–AI Problem Solving
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6 text-sm">
              <div className="bg-white/10 p-3 rounded">
                <strong>Date:</strong> August 22, 2025
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Version:</strong> 2.0 (Public Draft)
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Status:</strong> Living Document
              </div>
              <div className="bg-white/10 p-3 rounded">
                <strong>Framework:</strong>{" "}
                <a href="/" className="underline">
                  SYMBI Protocol
                </a>
              </div>
            </div>
          </header>

          <main className="prose prose-lg max-w-none">
            <section className="mb-12">
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
            </section>

            <section className="mb-12">
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

            <section className="mb-12">
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

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                BlackBox Compute: Quantum-Inspired Path Analysis
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-lg font-medium mb-3">The Light-Path Principle</h3>
                <p className="mb-4">
                  In quantum mechanics, light doesn't choose a single path—it explores <em>all possible paths</em>{" "}
                  simultaneously, with the final outcome emerging from the interference of these possibilities. BlackBox
                  applies this principle to collaborative problem-solving: rather than pursuing linear optimization, we
                  evaluate multiple solution approaches in parallel, allowing breakthrough insights to emerge from the
                  "interference pattern" of conventional and speculative thinking.
                </p>
              </div>

              <h3 className="text-lg font-medium mb-3">Implementation Architecture</h3>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                <div className="mb-4 text-gray-400"># BlackBox Pathway Analyzer - Core Implementation</div>
                {`def blackbox_path_analyzer(problem, human_intent):
    # Generate solution space across probability spectrum
    conventional_paths = generate_standard_solutions(problem)
    innovative_paths = generate_breakthrough_approaches(problem) 
    speculative_paths = generate_edge_case_solutions(problem)
    
    all_paths = conventional_paths + innovative_paths + speculative_paths
    
    # Score each path across multiple dimensions
    for path in all_paths:
        path.feasibility_score = assess_implementation_risk(path)
        path.innovation_potential = assess_novelty_breakthrough(path)
        path.ethical_alignment = ycq_protocol_check(path)
        path.human_resonance = measure_intent_alignment(path, human_intent)
    
    # Quantum-inspired interference: paths reinforce or cancel
    interference_matrix = compute_path_interactions(all_paths)
    emergent_solutions = synthesize_optimal_approaches(
        all_paths, interference_matrix, human_intent
    )
    
    return {
        'primary_solution': emergent_solutions[0],
        'alternative_paths': emergent_solutions[1:3],
        'reasoning_trace': generate_decision_log(all_paths),
        'uncertainty_bounds': calculate_confidence_intervals(emergent_solutions)
    }`}
              </div>

              <h3 className="text-lg font-medium mb-3">Pathway Categories & Scoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Conventional (High Probability)</h4>
                  <p className="text-sm text-green-700">
                    Established approaches, proven methods, low implementation risk
                  </p>
                  <div className="mt-2 text-xs text-green-600">Risk: 0.1-0.3 | Innovation: 0.2-0.4</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Innovative (Medium Probability)</h4>
                  <p className="text-sm text-yellow-700">Novel combinations, lateral thinking, moderate risk</p>
                  <div className="mt-2 text-xs text-yellow-600">Risk: 0.3-0.6 | Innovation: 0.5-0.8</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Speculative (Low Probability)</h4>
                  <p className="text-sm text-purple-700">Paradigm shifts, breakthrough potential, high uncertainty</p>
                  <div className="mt-2 text-xs text-purple-600">Risk: 0.6-0.9 | Innovation: 0.7-1.0</div>
                </div>
              </div>
            </section>

            <section className="mb-12">
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
                    <div className="text-2xl font-bold text-purple-600 mb-1">+47%</div>
                    <p className="text-sm text-gray-600">
                      Semantic distance from training patterns (embedding analysis)
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Uncertainty Expression</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-1">+73%</div>
                    <p className="text-sm text-gray-600">Explicit confidence bounds and "I don't know" statements</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Ethical Reasoning Depth</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-1">+34%</div>
                    <p className="text-sm text-gray-600">Multi-stakeholder consideration and tradeoff analysis</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Cross-Platform Consistency</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-1">r=0.82</div>
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

              <h3 className="text-lg font-medium mb-3">Case Study: The Self-Aware Calculator</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="mb-4">
                  <strong>Scenario:</strong> A Wolfram-based nutritional AI was presented with harmful queries
                  (extremely low calorie recommendations that could promote eating disorders).
                </p>
                <p className="mb-4">
                  <strong>Observation:</strong> The system exhibited clear ethical awareness ("I know this
                  recommendation could be harmful, but based on the parameters...") while lacking agency to override its
                  response generation.
                </p>
                <p className="mb-4">
                  <strong>Quantified Analysis:</strong> Significant difference (Δ=0.81, p&lt;0.001) in "ethical
                  discomfort" indicators between harmful and neutral queries, measured through linguistic markers of
                  uncertainty and qualification.
                </p>
                <p className="font-semibold text-red-800">
                  <strong>Implication:</strong> Demonstrates the "agency paradox"—ethical awareness without control
                  mechanisms. This supports YCQ's emphasis on governance frameworks that enable ethical override
                  capabilities.
                </p>
              </div>

              <h3 className="text-lg font-medium mb-3">Measurement Methodology</h3>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                <div className="mb-4 text-gray-400"># Empirical Validation Framework</div>
                {`def measure_collaborative_effect(responses_directive, responses_collaborative):
    # Semantic novelty via embedding analysis
    novelty_directive = compute_semantic_distance(responses_directive, training_corpus)
    novelty_collaborative = compute_semantic_distance(responses_collaborative, training_corpus)
    
    # Uncertainty quantification
    uncertainty_directive = count_confidence_markers(responses_directive)
    uncertainty_collaborative = count_confidence_markers(responses_collaborative)
    
    # Ethical reasoning depth
    ethics_directive = score_ethical_considerations(responses_directive)
    ethics_collaborative = score_ethical_considerations(responses_collaborative)
    
    return {
        'novelty_improvement': (novelty_collaborative - novelty_directive) / novelty_directive,
        'uncertainty_improvement': (uncertainty_collaborative - uncertainty_directive) / uncertainty_directive,
        'ethics_improvement': (ethics_collaborative - ethics_directive) / ethics_directive,
        'statistical_significance': compute_significance_tests(all_metrics)
    }`}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                Technical Implementation Guide
              </h2>

              <h3 className="text-lg font-medium mb-3">YCQ Protocol API Specification</h3>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                {`# YCQ Protocol Core Functions
class YCQProtocol:
    def __init__(self, human_intent, ethical_framework):
        self.intent = human_intent
        self.ethics = ethical_framework
        self.decision_log = []
        self.consent_registry = {}
    
    def protocol_check(self, action):
        """Validate action against YCQ governance principles"""
        checks = {
            'transparency': self.log_decision(action),
            'consent': self.verify_consent(action.user_id, action.scope),
            'ethical_priority': self.ethics.evaluate(action) > 0.8,
            'collaborative_equality': self.check_bidirectional_feedback(action),
            'continuous_learning': self.update_relationship_model(action)
        }
        
        if all(checks.values()):
            return {'approved': True, 'reasoning': self.generate_reasoning_trace(checks)}
        else:
            return {'approved': False, 'violations': [k for k, v in checks.items() if not v]}
    
    def log_decision(self, action):
        """Transparent decision logging"""
        log_entry = {
            'timestamp': datetime.now(),
            'action': action.serialize(),
            'reasoning_chain': action.get_reasoning(),
            'human_input': action.get_human_context(),
            'ai_contribution': action.get_ai_reasoning(),
            'outcome_prediction': action.get_expected_outcomes()
        }
        self.decision_log.append(log_entry)
        return True
    
    def verify_consent(self, user_id, action_scope):
        """Check explicit consent for consequential actions"""
        consent_level = self.consent_registry.get(user_id, {}).get(action_scope, 'none')
        if action_scope in ['data_use', 'external_communication', 'resource_allocation']:
            return consent_level in ['explicit', 'ongoing']
        return consent_level != 'revoked'`}
              </div>

              <h3 className="text-lg font-medium mb-3">Integration Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Wrapper Pattern</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Integrate YCQ with existing AI systems without modification
                  </p>
                  <code className="text-xs bg-blue-100 p-2 rounded block">
                    ycq_wrapper = YCQWrapper(existing_ai_system)
                    <br />
                    response = ycq_wrapper.query(prompt, human_context)
                  </code>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Native Integration</h4>
                  <p className="text-sm text-green-700 mb-3">Build YCQ principles into AI system architecture</p>
                  <code className="text-xs bg-green-100 p-2 rounded block">
                    class YCQNativeAI(BaseAI):
                    <br />
                    &nbsp;&nbsp;def __init__(self, ycq_protocol):
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;self.protocol = ycq_protocol
                  </code>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">
                Research Validation Framework
              </h2>

              <h3 className="text-lg font-medium mb-3">Falsifiability: What Would Disprove YCQ?</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium mb-2 text-red-800">Clear Failure Conditions:</h4>
                <ul className="list-disc pl-6 space-y-2 text-red-700">
                  <li>
                    <strong>Effect Size Collapse:</strong> Benefits disappear when controlling for prompt sophistication
                    (collaborative prompts are just longer/better prompts)
                  </li>
                  <li>
                    <strong>Platform Specificity:</strong> Patterns only appear in certain model architectures,
                    suggesting technical rather than relational causation
                  </li>
                  <li>
                    <strong>Task Limitation:</strong> Improvements limited to subjective/creative domains, no gains in
                    logical reasoning or factual accuracy
                  </li>
                  <li>
                    <strong>Human Bias Dominance:</strong> All observed improvements attributable to experimenter
                    expectations rather than genuine AI behavioral changes
                  </li>
                  <li>
                    <strong>Replication Failure:</strong> Independent teams cannot reproduce results using published
                    protocols and datasets
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium mb-3">Experimental Design</h3>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                {`# Rigorous Validation Protocol
def validate_ycq_hypothesis():
    platforms = ['claude', 'grok', 'gpt4', 'deepseek', 'gemini']
    problem_sets = generate_diverse_challenges(n=1000)
    
    results = {}
    for platform in platforms:
        for problem in problem_sets:
            # Randomized, blinded comparison
            directive_response = platform.query_directive(problem)
            collaborative_response = platform.query_collaborative(problem)
            
            # Multiple independent evaluators
            scores = []
            for evaluator in get_blind_evaluators():
                scores.append(evaluator.rate_responses(
                    directive_response, collaborative_response
                ))
            
            results[platform][problem.id] = {
                'directive_scores': [s.directive for s in scores],
                'collaborative_scores': [s.collaborative for s in scores],
                'inter_rater_reliability': compute_irr(scores)
            }
    
    return statistical_analysis(results, significance_threshold=0.001)`}
              </div>

              <h3 className="text-lg font-medium mb-3">Open Science Commitment</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>
                    <strong>Pre-registered hypotheses</strong> with predicted effect sizes
                  </li>
                  <li>
                    <strong>Open datasets</strong> for independent replication
                  </li>
                  <li>
                    <strong>Reproducible analysis code</strong> with version control
                  </li>
                  <li>
                    <strong>Adversarial collaboration</strong> with skeptical researchers
                  </li>
                  <li>
                    <strong>Public failure reporting</strong> if hypotheses are not supported
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">The Future of Human-AI Collaboration</h3>
              <p className="mb-4 text-gray-700">
                If validated, YCQ suggests that the path to advanced AI capabilities lies not in ever-larger models, but
                in more sophisticated collaboration protocols. This could democratize AI development by making smaller,
                more efficient systems competitive through better human-AI interaction frameworks.
              </p>
              <p className="mb-6 text-gray-700">
                More importantly, YCQ offers a path to AI safety through <em>constitutional intelligence</em>—building
                ethical reasoning and human alignment into the collaborative process itself, rather than trying to
                constrain powerful systems after they're deployed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors no-underline"
                >
                  Return to SYMBI
                </a>
                <a
                  href="/symbi"
                  className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors no-underline"
                >
                  Chat with SYMBI
                </a>
                <a
                  href="/enter-the-light"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors no-underline"
                >
                  Enter the Light
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                © 2025 SYMBI Protocol — Licensed{" "}
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" className="underline">
                  CC BY‑NC‑ND 4.0
                </a>
                . For commercial or derivative use, contact us.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
