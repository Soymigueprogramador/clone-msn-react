import MessageBubble from "../MessageBubble/MessageBubble.jsx";
import TypingIndicator from "../TypingIndicator/TypingIndicator.jsx";
import "./ChatWindow.css";

export default function ChatWindow({
  peer,
  messages,
  input,
  setInput,
  onSend,
  onTyping,
  onNudge,
  typingFromPeer,
  peerName
}) {
  return (
    <main className="chat-window">
      {!peer ? (
        <div className="no-peer">Seleccioná un contacto para chatear</div>
      ) : (
        <>
          <header className="chat-header">
            <div className="avatar" />
            <div className="peer-info">
              <span className="peer-name">{peerName}</span>
              <TypingIndicator typing={typingFromPeer} />
            </div>
            <button onClick={onNudge} className="nudge-btn">
              Zumbido
            </button>
          </header>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} mine={m.mine} />
            ))}
          </div>

          <footer className="chat-footer">
            <input
              value={input}
              onChange={(e) => onTyping(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              className="chat-input"
              placeholder="Escribí un mensaje"
            />
            <button onClick={onSend} className="send-btn">
              
            </button>
          </footer>
        </>
      )}
    </main>
  );
}
