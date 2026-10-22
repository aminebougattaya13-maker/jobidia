import { ChatPanel } from "@/components/chat-panel";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="nav">
          <div className="brand">
            <div className="brand-mark">J</div>
            <span>Jobidia</span>
          </div>
          <div className="nav-actions">
            <button className="ghost-button">Features</button>
            <button className="ghost-button">Pricing</button>
            <button className="primary-button">Try now</button>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">AI workspace for teams and creators</span>
            <h1>Talk to your smartest assistant.</h1>
            <p>
              Jobidia gives you a premium AI experience for brainstorming,
              coding, research, and everyday productivity.
            </p>
            <div className="cta-row">
              <button className="primary-button large">Launch app</button>
              <button className="secondary-button large">View demo</button>
            </div>
            <div className="trust-row">
              <span>Fast</span>
              <span>Secure</span>
              <span>Private</span>
            </div>
          </div>

          <div className="chat-preview">
            <div className="preview-header">
              <span className="online-dot" />
              Jobidia AI
            </div>
            <div className="preview-body">
              <div className="bubble bot">I can help you write, plan, code, and summarize.</div>
              <div className="bubble user">Create a launch plan for an AI startup.</div>
              <div className="bubble bot">Absolutely — here is a 30-day roadmap...</div>
            </div>
          </div>
        </div>
      </section>

      <ChatPanel />
    </main>
  );
}
