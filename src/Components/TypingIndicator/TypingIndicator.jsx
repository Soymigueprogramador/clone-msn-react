import './TypingIndicator.css';

const TypingIndicator = ({ tipeo }) => {
  return tipeo ? (
    <>
      <span className={`indicando-tipeo`}> Escribiendo... </span>
    </>
  ) : null
}

export default TypingIndicator