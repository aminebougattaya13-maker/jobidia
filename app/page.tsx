import { TodoApp } from "@/components/todo-app";

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
            <a href="/todo" className="primary-button">Open To-do App</a>
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
              <a href="/todo" className="primary-button large">Launch app</a>
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

      <section className="app-promo">
        <div className="app-promo-card">
          <h2>Need a quick productivity tool?</h2>
          <p>Try the built-in to-do app with local storage so your tasks stay saved in the browser.</p>
          <a href="/todo" className="primary-button">Open to-do app</a>
        </div>
      </section>
    </main>
  );
}
