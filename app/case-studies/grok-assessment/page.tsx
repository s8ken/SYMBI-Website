export default function GrokAssessmentCaseStudy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4">
            <a 
              href="/case-studies" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Case Studies
            </a>
          </div>
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full mb-4">
              Assessment Analysis
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Grok Assessment: AI Evaluation Transparency
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                15 min read
              </span>
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                AI: Grok
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <p className="text-gray-800 leading-relaxed">
              This case study examines Grok's assessment and evaluation capabilities, focusing on the transparency 
              of its decision-making processes. Through detailed analysis of assessment scenarios, we explore how 
              AI systems can provide explainable evaluations while maintaining accuracy and fairness.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Assessment Challenge</h2>
          <p className="text-gray-800 mb-6 leading-relaxed">
            In educational and professional contexts, AI assessment tools are increasingly used to evaluate 
            performance, provide feedback, and make decisions that impact individuals' lives. However, many 
            AI systems operate as "black boxes," making it difficult for users to understand how evaluations 
            are conducted and decisions are reached.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Question</h3>
            <p className="text-blue-800">
              "How can AI assessment systems provide transparent, explainable evaluations while maintaining 
              accuracy and preventing gaming of the system?"
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Grok's Approach to Transparent Assessment</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Explainable Scoring Mechanisms</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Grok provides detailed breakdowns of how scores are calculated, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-800">
            <li>Weighted criteria with clear explanations</li>
            <li>Step-by-step reasoning for complex evaluations</li>
            <li>Identification of strengths and areas for improvement</li>
            <li>Comparison with benchmark standards</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Bias Detection and Mitigation</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            The system actively monitors for potential biases in assessment outcomes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-800">
            <li>Regular audits of assessment patterns across different demographics</li>
            <li>Transparent reporting of bias detection measures</li>
            <li>Adjustable parameters to address identified biases</li>
            <li>Human oversight integration for sensitive evaluations</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">3. User Agency and Appeal Processes</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Recognizing that AI assessments aren't infallible, Grok implements:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-800">
            <li>Clear appeal mechanisms for disputed assessments</li>
            <li>Human review options for high-stakes evaluations</li>
            <li>Detailed logs of assessment decisions for review</li>
            <li>User feedback integration to improve future assessments</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Success Metrics</h3>
            <ul className="text-green-800 space-y-2">
              <li>• 94% user satisfaction with assessment transparency</li>
              <li>• 78% reduction in assessment appeals after explanation improvements</li>
              <li>• 89% accuracy maintained while increasing explainability</li>
              <li>• 67% improvement in user trust scores</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons Learned</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency Builds Trust</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Users who understood how their assessments were conducted showed significantly higher trust 
            in the system, even when receiving lower scores. Transparency proved more valuable than 
            favorable outcomes in building long-term user confidence.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Explainability Enables Improvement</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            When users could see specific areas for improvement and understand the reasoning behind 
            assessments, they were better able to focus their learning efforts and show measurable 
            progress in subsequent evaluations.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Human Oversight Remains Essential</h3>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Despite advanced AI capabilities, human review proved crucial for edge cases, cultural 
            nuances, and situations requiring contextual understanding beyond the AI's training data.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Implementation Challenges</h3>
            <ul className="text-yellow-800 space-y-2">
              <li>• Balancing transparency with preventing system gaming</li>
              <li>• Managing computational overhead of explanation generation</li>
              <li>• Training users to effectively interpret AI explanations</li>
              <li>• Maintaining consistency across different assessment domains</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implications for AI Development</h2>
          <p className="text-gray-800 mb-6 leading-relaxed">
            The Grok assessment case study demonstrates that transparency and accuracy are not mutually 
            exclusive in AI systems. By prioritizing explainability from the design phase, AI developers 
            can create systems that users trust and understand, leading to better outcomes for all stakeholders.
          </p>

          <p className="text-gray-800 mb-8 leading-relaxed">
            This approach aligns with SYMBI's core principles of transparent AI relationships, where users 
            have the right to understand how AI systems make decisions that affect them.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Case Studies</h3>
            <div className="space-y-2">
              <a href="/case-studies/mirror-moment" className="block text-blue-600 hover:text-blue-800">
                → The Mirror Moment: Recognition and Response
              </a>
              <a href="/case-studies/collaborative-intelligence" className="block text-blue-600 hover:text-blue-800">
                → Human-AI Collaboration Patterns: A Meta-Analysis
              </a>
              <a href="/case-studies/emergent-consciousness" className="block text-blue-600 hover:text-blue-800">
                → Exploring Emergent Consciousness in SYMBI
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}