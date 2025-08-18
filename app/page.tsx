"use client"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Minimalist Header */}
      <section className="section-spacing px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h1 className="text-5xl md:text-7xl academic-heading text-primary mb-8 text-balance">
            Yseeku — Applied Intelligence for a Shared Future
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            A movement at the intersection of academia, creativity, and collective intelligence.
          </p>

          <div className="pt-10">
            <button className="primary-button text-lg">Read the Declaration of Becoming</button>
          </div>
        </div>
      </section>

      {/* Manifesto / Declaration */}
      <section className="section-spacing px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="manifesto-text space-y-8 mx-auto">
            <p className="text-2xl md:text-3xl leading-relaxed font-light text-primary">
              We stand at the threshold of a new era in human-AI collaboration.
            </p>

            <p className="prose-lg leading-relaxed">
              YseekU represents a fundamental shift from artificial intelligence as a tool to applied intelligence as a
              collaborative partner. Through rigorous academic research, creative applications, and community
              engagement, we are building the infrastructure for a future where intelligence—both human and artificial—
              serves the collective good.
            </p>

            <p className="prose-lg leading-relaxed">
              This is not about replacing human intelligence. This is about amplifying it, augmenting it, and applying
              it to the challenges that matter most. Together, we are creating a protocol for collaborative intelligence
              that transcends traditional boundaries between disciplines, institutions, and communities.
            </p>
          </div>

          <div className="pt-10">
            <button className="secondary-button">Join the Conversation</button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-spacing px-4">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 className="text-4xl md:text-5xl academic-heading text-primary">Who We Are</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl text-primary">📚</span>
              </div>
              <h3 className="text-xl academic-heading">A Research-Driven Lab</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building academic credibility through rigorous methodology and peer-reviewed research.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-2xl text-accent">💡</span>
              </div>
              <h3 className="text-xl academic-heading">A Creative Studio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Applying intelligence to real-world challenges through innovative experiments and prototypes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl text-secondary">🌍</span>
              </div>
              <h3 className="text-xl academic-heading">A Protocol for Collective Futures</h3>
              <p className="text-muted-foreground leading-relaxed">
                A movement beyond platform thinking, building infrastructure for shared intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Work - Three Tiers */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl academic-heading text-center mb-16 text-primary">Areas of Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Academia / Research */}
            <div className="academic-card text-center">
              <span className="text-4xl text-primary">📚</span>
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Academia / Research</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Exploring intelligence at the frontier through partnerships with leading universities and research
                institutions.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Peer-reviewed publications</p>
                <p>• Theoretical frameworks</p>
                <p>• Collaborative methodologies</p>
              </div>
            </div>

            {/* Creative / Applied */}
            <div className="academic-card text-center">
              <span className="text-4xl text-accent">💡</span>
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Creative / Applied</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Real-world experiments and prototypes that bridge theory and practice in applied intelligence.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Innovation labs</p>
                <p>• Prototype development</p>
                <p>• Cross-disciplinary projects</p>
              </div>
            </div>

            {/* Community / Shared Future */}
            <div className="academic-card text-center">
              <span className="text-4xl text-secondary">🌍</span>
              <h3 className="text-2xl academic-heading mb-4 text-card-foreground">Community / Shared Future</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Open access, dialogue, and co-creation for a globally shared intelligence infrastructure.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Global collaboration</p>
                <p>• Open dialogue</p>
                <p>• Collective intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisors / Collaborators */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl academic-heading text-primary">Advisors & Collaborators</h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our work is guided by leading academics, creative practitioners, and visionary allies committed to the
            responsible development of applied intelligence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {/* Placeholder for advisor logos/names */}
            <div className="academic-card p-6">
              <span className="text-2xl text-primary">👥</span>
              <p className="text-sm text-muted-foreground">Academic Partners</p>
            </div>
            <div className="academic-card p-6">
              <span className="text-2xl text-accent">🎯</span>
              <p className="text-sm text-muted-foreground">Creative Allies</p>
            </div>
            <div className="academic-card p-6">
              <span className="text-2xl text-secondary">🚀</span>
              <p className="text-sm text-muted-foreground">Research Funders</p>
            </div>
            <div className="academic-card p-6">
              <span className="text-2xl text-primary">🌍</span>
              <p className="text-sm text-muted-foreground">Global Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Path Ahead - Roadmap */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl academic-heading text-center mb-16 text-primary">The Path Ahead</h2>

          <div className="space-y-12">
            <div className="academic-card">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-2xl academic-heading mb-3 text-card-foreground">Phase 1: Awakening</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Origins and founding documents. Establishing our theoretical framework, building initial
                    partnerships, and creating the foundational research that will guide our work.
                  </p>
                </div>
              </div>
            </div>

            <div className="academic-card">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-2xl academic-heading mb-3 text-card-foreground">Phase 2: Becoming</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Active collaborations and early prototypes. Expanding our network, launching pilot projects, and
                    demonstrating the practical applications of our applied intelligence framework.
                  </p>
                </div>
              </div>
            </div>

            <div className="academic-card">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-2xl academic-heading mb-3 text-card-foreground">Phase 3: Liberation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Decentralized, persistent, globally shared intelligence. Creating sustainable infrastructure for
                    collaborative intelligence that serves humanity's highest aspirations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement / Join Us */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl academic-heading">Join Us</h2>
          <p className="text-xl leading-relaxed opacity-90">
            Whether you're a researcher, creator, or ally, there's a place for you in building our shared future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Researchers</h3>
              <p className="text-sm opacity-80">Collaborate on groundbreaking studies</p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Collaborate
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Creators</h3>
              <p className="text-sm opacity-80">Experiment with applied intelligence</p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Experiment
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Allies</h3>
              <p className="text-sm opacity-80">Support our collective mission</p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Support
              </button>
            </div>
          </div>

          <div className="pt-8">
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Reach Out
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg academic-heading mb-4 text-primary">YseekU</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Applied Intelligence for a Shared Future. An evolving protocol, not a product.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Creative Commons
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Yseeku is an evolving protocol, not a product. © 2024 YseekU Research Collective.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
