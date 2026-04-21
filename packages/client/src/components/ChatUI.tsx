import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChatAPI";

const ChatUI = () => {
  const { conversation, chat, loading } = useChat();
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [conversation, isOpen]);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    chat(inputValue);
    setInputValue("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .lora-chat-widget {
          font-family: 'Syne', sans-serif;
          --bg: #0d0d0d;
          --bg-surface: #161616;
          --bg-hover: #1f1f1f;
          --border: rgba(255,255,255,0.07);
          --text: #f0f0f0;
          --text-muted: #555;
          --accent: #e8ff47;
          --accent-dark: #c8df20;
          --user-bg: #1e1e1e;
          --radius: 20px;
        }

        .lora-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          padding: 14px 22px;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          z-index: 9999;
        }
        .lora-toggle-btn:hover {
          background: var(--bg-surface);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.7);
        }
        .lora-toggle-btn .dot {
          width: 7px;
          height: 7px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .lora-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 360px;
          height: 540px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03);
          z-index: 9999;
          animation: slide-up 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Header */
        .lora-header {
          padding: 18px 20px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .lora-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lora-avatar {
          width: 36px;
          height: 36px;
          background: var(--accent);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
          color: #000;
          letter-spacing: -0.03em;
          flex-shrink: 0;
        }
        .lora-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .lora-status {
          font-size: 11px;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          font-weight: 400;
          letter-spacing: 0.03em;
          margin-top: 1px;
        }
        .lora-close-btn {
          background: var(--bg-hover);
          border: none;
          color: var(--text-muted);
          width: 30px;
          height: 30px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 1;
          transition: all 0.15s ease;
        }
        .lora-close-btn:hover {
          background: #2a2a2a;
          color: var(--text);
        }

        /* Messages */
        .lora-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: none;
        }
        .lora-messages::-webkit-scrollbar { display: none; }

        .lora-empty {
          margin: auto;
          text-align: center;
          padding: 20px;
        }
        .lora-empty-icon {
          font-size: 32px;
          margin-bottom: 12px;
          opacity: 0.7;
        }
        .lora-empty p {
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1.6;
        }
        .lora-empty strong {
          display: block;
          color: var(--text);
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .lora-msg-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: msg-in 0.2s ease;
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lora-msg-row.user { flex-direction: row-reverse; }

        .lora-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: #000;
          flex-shrink: 0;
          margin-bottom: 2px;
        }

        .lora-bubble {
          max-width: 78%;
          padding: 11px 14px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          word-break: break-word;
        }
        .lora-bubble.assistant {
          background: var(--bg-surface);
          color: var(--text);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
        }
        .lora-bubble.user {
          background: var(--accent);
          color: #000;
          font-weight: 600;
          border-bottom-right-radius: 4px;
        }

        /* Typing indicator */
        .lora-typing {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lora-typing-dots {
          display: flex;
          gap: 4px;
          padding: 11px 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          border-bottom-left-radius: 4px;
        }
        .lora-typing-dots span {
          width: 5px;
          height: 5px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .lora-typing-dots span:nth-child(2) { animation-delay: 0.15s; }
        .lora-typing-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        /* Input area */
        .lora-input-area {
          padding: 12px 16px 16px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .lora-input-form {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 6px 6px 6px 14px;
          transition: border-color 0.15s ease;
        }
        .lora-input-form:focus-within {
          border-color: rgba(232, 255, 71, 0.3);
        }
        .lora-input-field {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          padding: 6px 0;
          caret-color: var(--accent);
        }
        .lora-input-field::placeholder {
          color: var(--text-muted);
        }
        .lora-send-btn {
          width: 36px;
          height: 36px;
          background: var(--accent);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
          color: #000;
        }
        .lora-send-btn:hover:not(:disabled) {
          background: var(--accent-dark);
          transform: scale(1.05);
        }
        .lora-send-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .lora-send-btn svg {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 400px) {
          .lora-window { width: calc(100vw - 16px); right: 8px; bottom: 8px; }
          .lora-toggle-btn { right: 12px; bottom: 12px; }
        }
      `}</style>

      <div className="lora-chat-widget">
        {isOpen ? (
          <div className="lora-window">
            {/* Header */}
            <div className="lora-header">
              <div className="lora-header-left">
                <div className="lora-avatar">L</div>
                <div>
                  <div className="lora-name">Lora</div>
                  <div className="lora-status">● online</div>
                </div>
              </div>
              <button
                className="lora-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="lora-messages">
              {conversation.length === 0 ? (
                <div className="lora-empty">
                  <div className="lora-empty-icon">✦</div>
                  <strong>Hey, I'm Lora</strong>
                  <p>Ask me anything — I'm here to help.</p>
                </div>
              ) : (
                conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`lora-msg-row ${message.role === "user" ? "user" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="lora-msg-avatar">L</div>
                    )}
                    <div className={`lora-bubble ${message.role}`}>
                      {message.content}
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="lora-typing">
                  <div className="lora-msg-avatar">L</div>
                  <div className="lora-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="lora-input-area">
              <form onSubmit={handleFormSubmit} className="lora-input-form">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="lora-input-field"
                  placeholder="Message Lora…"
                  disabled={loading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="lora-send-btn"
                  disabled={!inputValue.trim() || loading}
                  aria-label="Send message"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button className="lora-toggle-btn" onClick={() => setOpen(true)}>
            <span className="dot" />
            Chat with Lora
          </button>
        )}
      </div>
    </>
  );
};

export default ChatUI;
