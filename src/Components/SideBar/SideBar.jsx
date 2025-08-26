import "./SideBar.css";

import ContactItem from "../ContactItem/ContactItem.jsx";
import useChatStore from "../../Store/ChatSore.js";
const SideBar = ({ onSelect }) => {
  const { me, contactos, currentPeer, setPeer, setStatus } = useChatStore();

  return (
    <>
      <aside className="sidebar">
        <header className="sidebar-header">
          <div>
            <h1 className="sidebar-title">MSN React.js</h1>
            <p className="sidebar-nick">Hola MSN</p>
          </div>

          <select className="sidebar-select">
            <option value="Conectado"> Conectado </option>
            <option value="Desconectado"> Desconectado </option>
            <option value="Ocupado"> Ocupado </option>
          </select>
        </header>

        <ul className="sidebar-list">
          {contactos.map((c) => (
            <ContactItem
              key={c.id}
              contacto={c}
              activo={currentPeer === c.id}
              onClick={() => {
                setPeer(c.id);
                onSelect?.(c.id);
              }}
            />
          ))}
        </ul>
        
      </aside>
    </>
  );
};

export default SideBar;