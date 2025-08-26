import './MessageBubble.css';

const MessageBubble = ({ msg, mine }) => {
  return (
    <>
        <div className={`mensaje-row ${mine ? "mine" : "theirs"}`}>
           <div className={`mensaje-dubble ${mine ? "mine" : "theirs"}`}>
            {
                msg.text
            }
           </div>
        </div>
    </>
  )
}

export default MessageBubble