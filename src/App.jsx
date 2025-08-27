import { useState, useEffect, useRef } from "react";
import socket from "./lib/socket.js";
import useChatStore from "./Store/ChatSore.js";
import Sidebar from "./components/SideBar/SideBar.jsx";
import ChatWindow from "./components/ChatWindow/ChatWindow.jsx";
import './App.css';

export default function App() {
  // Desestructuramos del store los datos correctos
  const { me, contactos, currentPeer, pairRoom, upsertHistory, pushMessage, setTyping, typingFromPeer } = useChatStore();

  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const roomId = currentPeer ? pairRoom(me.id, currentPeer) : null;

  // Conexiones Socket.io
  useEffect(() => {
    socket.emit("login", { userId: me.id, nick: me.nick, status: me.status });

    socket.on("presence:list", (list) =>
      useChatStore.setState({ contactos: list.filter(u => u.id !== me.id) })
    );

    socket.on("chat:history", ({ room, history }) => upsertHistory(room, history));
    socket.on("chat:message", (msg) => pushMessage(pairRoom(msg.from, msg.to), msg));
    socket.on("chat:typing", ({ from, typing }) => {
      if (from === currentPeer) setTyping(typing);
    });

    socket.on("chat:nudge", () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.classList.add("shake");
        setTimeout(() => chatBoxRef.current.classList.remove("shake"), 600);
      }
    });

    // Limpiar listeners al desmontar
    return () => {
      socket.off("presence:list");
      socket.off("chat:history");
      socket.off("chat:message");
      socket.off("chat:typing");
      socket.off("chat:nudge");
    };
  }, [currentPeer]);

  // Unirse a la sala cuando cambia el peer
  useEffect(() => {
    if (roomId) {
      socket.emit("chat:join", { me: me.id, other: currentPeer });
    }
  }, [roomId]);

  // Funciones de envío y typing
  const send = () => {
    if (!input.trim() || !currentPeer) return;
    socket.emit("chat:message", { from: me.id, to: currentPeer, text: input });
    setInput("");
    socket.emit("chat:typing", { me: me.id, other: currentPeer, typing: false });
  };

  const nudge = () => socket.emit("chat:nudge", { from: me.id, to: currentPeer });
  const onTyping = (val) => {
    setInput(val);
    socket.emit("chat:typing", { me: me.id, other: currentPeer, typing: val.length > 0 });
  };

  // Selector estable para messages
  const messages = roomId
    ? useChatStore(s => s.history?.[roomId] || [])
    : [];

  // Nombre del peer
  const peerName = contactos?.find(c => c.id === currentPeer)?.nick || "Contacto";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-12 gap-4" ref={chatBoxRef}>
        <Sidebar />
        <ChatWindow
          peer={currentPeer}
          peerName={peerName}
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={send}
          onTyping={onTyping}
          onNudge={nudge}
          typingFromPeer={typingFromPeer}
        />
      </div>
    </div>
  );
}