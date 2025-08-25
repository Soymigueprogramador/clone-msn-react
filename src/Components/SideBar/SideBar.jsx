import "./SideBar.css";
//import ContactItem from '../ContactItem/ContactItem.jsx';

const SideBar = () => {
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


      </aside>
    </>
  );
};

export default SideBar;
