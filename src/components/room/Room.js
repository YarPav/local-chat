import {Link} from "react-router-dom";
import {useParams} from "react-router";
import SendMessageForm from "../sendMessageForm/SendMessageForm";
import Message from "../message/Message";
import {useSelector, useDispatch} from "react-redux";
import {setMessages} from "../sendMessageForm/MessageSlice";
import {changeName} from "../authentication/AuthenticationSlice";
import {useEffect, useState} from "react";

import "./Room.css";

const Room = () => {
    const [newMessageCounter, setNewMessageCounter] = useState(false);
    const dispatch = useDispatch();
    const room = useParams().roomId;
    const name = new URLSearchParams(window.location.search).get('name');
    const {messages} = useSelector(state => state.messages);

    window.addEventListener('storage', (e) => {
        if (e.storageArea === localStorage && e.key === 'rooms') {
            setNewMessageCounter((state) => state + 1);
        }
    });

    useEffect(() => {
        dispatch(changeName(name));
        dispatch(setMessages(JSON.parse(localStorage.getItem('rooms'))
            .find(roomItem => roomItem.roomName === room).messages));
    }, [newMessageCounter]);

    return (
        <section className="room">
            <div className="room__header-wrapper">
                <header className="room__header">
                    <nav>
                        <Link className="room__link" to={`/?name=${name}&room=${room}`}>Change room or name</Link>
                    </nav>
                    <p className="room__user-name">{name}</p>
                </header>
                <h1 className="room__name">{room}</h1>
            </div>
            <section className="messages">
                {messages.map(mes => <Message key={mes.id} messageData={mes}/>)}
            </section>
            <SendMessageForm className="room__input" room={room}/>
        </section>
    );
}

export default Room;