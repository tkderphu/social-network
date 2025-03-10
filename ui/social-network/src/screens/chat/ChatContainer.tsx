interface Props {
    userChatBoxs?: Array<any>
}
import "./Chat.css"
function ChatContainer(props: Props) {
    return (
        <div id="chat-container">
            {props.userChatBoxs?.map(r => {
                return r
            })}
        </div>
    )
}
export default ChatContainer