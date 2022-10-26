import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addMessage, setReplyId} from "./MessageSlice";
import InputEmoji from 'react-input-emoji';
import {v4} from "uuid";

import "./SendMessageForm.css";

import filterImg from "../../files.png";
import addImg from "../../add.png";
import sendImg from "../../send.png";

const SendMessageForm = (props) => {
    const dispatch = useDispatch();
    const {room} = props;
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const {name} = useSelector(state => state.user);
    const {replyOn} = useSelector(state => state.messages);

    const sendMessage = (e) => {
        if (e !== message) {
            e.preventDefault();
        }
        if (message || files.length > 0) {
            const roomsData = JSON.parse(localStorage.getItem('rooms'));
            const roomIndex = roomsData.findIndex(i => i.roomName === room);
            const messageObj = {
                id: v4(),
                message: message,
                author: name,
                replyOn: replyOn,
                media: files
            };
            roomsData[roomIndex].messages = roomsData[roomIndex].messages.concat(messageObj);
            localStorage.setItem
            ('rooms', JSON.stringify
            (roomsData));
            dispatch(addMessage(messageObj));
            setMessage('');
            setFiles([]);
            dispatch(setReplyId(null));
        }
        // const roomsData = JSON.parse(localStorage.getItem('rooms'));
        // const roomIndex = roomsData.findIndex(i => i.roomName === room);
        // const messageObj = {
        //     id: v4(),
        //     message: message,
        //     author: name,
        //     replyOn: replyOn,
        //     media: files
        // };
        // roomsData[roomIndex].messages = roomsData[roomIndex].messages.concat(messageObj);
        // localStorage.setItem
        // ('rooms', JSON.stringify
        // (roomsData));
        // dispatch(addMessage(messageObj));
        // setMessage('');
        // setFiles([]);
        // dispatch(setReplyId(null));
    }
    const onFileInputChange = (e) => {
        const file = e.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.addEventListener('loadend', (e) => {
            setFiles(state => [...state, {isImg: file.type.startsWith('image/'), path: e.target.result}]);
        });
    }
    return (
        <div className="send-message">
            {
                files.length > 0 ?
                <div className="send-message__files">
                    {files ? files.map((file, index) =>
                    <img height="48px" key={index} src={file.isImg ? file.path : filterImg} alt="Media content"/>) : null}
                </div>
                    : null
            }
            <form className="send-message__form" onSubmit={sendMessage}>
                <InputEmoji
                    value={message}
                    onChange={setMessage}
                    cleanOnEnter
                    placeholder="Type a message"
                    onEnter={sendMessage}
                />
                <label htmlFor="add-file">
                    <img className="send-message__add-file-img" src={addImg} alt="Add your file"/>
                    <input id="add-file" style={{display: "none"}} type="file" onChange={onFileInputChange}/>
                </label>
                <button className="send-message__send-button" type="submit"><img src={sendImg} alt="Send"/></button>
            </form>
        </div>
    );
}

export default SendMessageForm;