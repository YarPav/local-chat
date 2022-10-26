import {useDispatch, useSelector} from "react-redux";
import {setReplyId} from "../sendMessageForm/MessageSlice";

import filterImg from "../../files.png";

import "./Message.css";

const Message = ({messageData}) => {
    const dispatch = useDispatch();
    const {messages, replyOn} = useSelector(state => state.messages);
    const {name} = useSelector(state => state.user);

    const onClickMessageHandler = (e) => {
        if (e.target.closest('.message__media-section')) return;
        if (replyOn === messageData.id) {
            dispatch(setReplyId(null));
        } else {
            dispatch(setReplyId(messageData.id));
        }
    }
    return (
        <article
            className={messageData.author === name ? "message message_own" : "message"}
            style={messageData.id === replyOn ? {backgroundColor: "rgba(73,160,215,0.54)"} : null}
            onClick={onClickMessageHandler}
        >
            <h2 className="message__body">{messageData.message}</h2>
            {
                messageData.author !== name ? <p className="message__author">{messageData.author}</p> : null
            }
            {
                messageData.media.length > 0 ?
                    <div className="message__media-section">
                        {
                            messageData.media ? messageData.media.map((file, index) =>
                                <a key={index} href={file.path} download>
                                    <img height="48px" src={file.isImg ? file.path : filterImg} alt=""/>
                                </a>
                            ) : null
                        }
                    </div>
                    : null
            }
            {
                messages.find(message => message.id === messageData.replyOn) ?
                    <p className="message__reply-on"><span className="message__reply-on_static">Reply on:</span> {messages.find(message => message.id === messageData.replyOn).message}</p>
                    : null
            }
        </article>
    );
}

export default Message;