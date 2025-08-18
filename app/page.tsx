"use client"

import { BookOpen, Lightbulb, Globe } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Manifesto Style */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h1 className="text-5xl md:text-7xl academic-heading text-primary mb-8">
            Applied Intelligence for a Shared Future
          </h1>

          <div className="manifesto-text mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-foreground font-medium">
              We stand at the threshold of a new era in human-AI collaboration.
            </p>

            <p>
              YseekU represents a fundamental shift from artificial intelligence as a tool to applied intelligence as a
              collaborative partner. Through rigorous academic research, creative applications, and community
              engagement, we are building the infrastructure for a future where intelligence—both human and artificial—
              serves the collective good.
            </p>

            <p>
              This is not about replacing human intelligence. This is about amplifying it, augmenting it, and applying
              it to the challenges that matter most. Together, we are creating a protocol for collaborative intelligence
              that transcends traditional boundaries between disciplines, institutions, and communities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="primary-button">Explore Our Research</button>
            <button className="secondary-button">Join the Collective</button>
          </div>
        </div>
      </section>

      {/* Three-Tier Engagement Model */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl academic-heading text-center mb-16 text-primary">Our Collaborative Framework</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Academia */}
            <div className="academic-card text-center" id="academia">
              <BookOpen size={48} className="mx-auto mb-6 text-primary" />
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Academia</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rigorous research partnerships with leading universities. Publishing peer-reviewed studies on applied
                intelligence, establishing new methodologies for human-AI collaboration, and building the theoretical
                foundation for our shared future.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Current partnerships with 12 research institutions</p>
              </div>
            </div>

            {/* Creative */}
            <div className="academic-card text-center" id="creative">
              <Lightbulb size={48} className="mx-auto mb-6 text-accent" />
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Creative</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-world applications that demonstrate the power of applied intelligence. From artistic collaborations
                to innovative problem-solving frameworks, we bridge the gap between theoretical research and practical
                implementation.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">47 active projects across diverse domains</p>
              </div>
            </div>

            {/* Community */}
            <div className="academic-card text-center" id="community">
              <Globe size={48} className="mx-auto mb-6 text-secondary" />
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                A global network of researchers, practitioners, and visionaries committed to collaborative intelligence.
                Together, we are building the social and technical infrastructure for a future where AI serves
                humanity's highest aspirations.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">2,847 active contributors worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Methodology */}
      <section className="py-20 px-4" id="intelligence">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl academic-heading text-center mb-12 text-primary">
            Our Approach to Applied Intelligence
          </h2>

          <div className="space-y-12">
            <div className="academic-card">
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Research-First Methodology</h3>
              <p className="manifesto-text">
                Every application of our intelligence framework begins with rigorous research. We publish our
                methodologies, share our findings, and submit our work for peer review. This commitment to academic
                integrity ensures that our applied intelligence solutions are built on solid theoretical foundations.
              </p>
            </div>

            <div className="academic-card">
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Collaborative Development</h3>
              <p className="manifesto-text">
                We believe that the most powerful intelligence emerges from collaboration, not competition. Our
                development process involves researchers, practitioners, and community members at every stage, ensuring
                that our solutions serve real needs and reflect diverse perspectives.
              </p>
            </div>

            <div className="academic-card">
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Transparent Evolution</h3>
              <p className="manifesto-text">
                Our intelligence framework evolves transparently. Every update, every improvement, every new capability
                is documented and shared. We believe that trust in applied intelligence can only be built through
                complete transparency in its development and deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl academic-heading">Join Us in Building the Future</h2>
          <p className="text-xl leading-relaxed opacity-90">
            Whether you're a researcher, practitioner, or visionary, there's a place for you in our collaborative
            intelligence framework. Together, we can build a future where applied intelligence serves humanity's highest
            aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Partnerships
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              View Research
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg academic-heading mb-4 text-primary">YseekU</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Applied Intelligence for a Shared Future. Building collaborative intelligence through research,
                creativity, and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Research</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Publications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Partnerships
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contributors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 YseekU Research Collective. Advancing collaborative intelligence for a shared future.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
