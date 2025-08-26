import './ContactItem.css'

const ContactItem = ({ contacto, activo, onClick }) => {
  return (
    <li>
      <button
        className={`contact-item ${activo ? "activo" : ""}`}
        onClick={onClick}
      >
        <span className={`status ${contacto.status}`}></span>
        <span className="nick">{contacto.nick}</span>
        <span className="status-text">{contacto.status}</span>
      </button>
    </li>
  )
}

export default ContactItem