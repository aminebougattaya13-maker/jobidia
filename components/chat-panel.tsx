"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I am Jobidia. Ask me to write, summarize, plan, code, or think through a problem.",
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "No response returned." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong while contacting the AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="chat-panel-wrap">
      <div className="chat-panel">
        <div className="chat-header">
          <div>
            <p className="small-label">Workspace</p>
            <h2>Jobidia Chat</h2>
          </div>
          <span className="status-pill">Online</span>
        </div>

        <div className="message-list">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
              <div className="message-badge">{message.role === "user" ? "You" : "AI"}</div>
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="composer">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Jobidia anything..."
            rows={3}
          />
          <div className="composer-actions">
            <span className="hint">Press Enter to send</span>
            <button type="submit" disabled={loading} className="primary-button">
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
