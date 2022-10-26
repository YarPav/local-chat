import {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./Authentication.css";


const Authentication = () => {
    const [name, setName] = useState(new URLSearchParams(window.location.search).get('name'));
    const [room, setRoom] = useState(new URLSearchParams(window.location.search).get('room'));
    const nav = useNavigate();
    const onAuthentication = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([name]));
        } else {
            if (JSON.parse(localStorage.getItem('users')).findIndex(user => user === name) === -1) {
                localStorage.setItem
                ('users', JSON.stringify([...JSON.parse(localStorage.getItem('users')), name]));
            }
        }
        if (!localStorage.getItem('rooms')) {
            localStorage.setItem('rooms', JSON.stringify
            ([{
                roomName: room,
                messages: []
            }]));
        } else {
            if (JSON.parse(localStorage.getItem('rooms')).findIndex(roomItem => roomItem.roomName === room) === -1) {
                localStorage.setItem
                ('rooms', JSON.stringify
                ([...JSON.parse(localStorage.getItem('rooms')), {
                    roomName: room,
                    messages: []
                }]));
            }
        }
        nav(`/room/${room}?name=${name}`);
    }
    const onNameInpChange = (e) => {
        setName(e.target.value);
    }
    const onRoomInpChange = (e) => {
        setRoom(e.target.value);
    }
    return (
        <form onSubmit={onAuthentication} className="authentication">
            <input placeholder="Name..." className="authentication__text" type="text" name="name" value={name} onChange={onNameInpChange}/>
            <input placeholder="Room..." className="authentication__text" type="text" name="room" value={room} onChange={onRoomInpChange}/>
            <input className="authentication__submit" type="submit" value="Go in"/>
        </form>
    );
}

export default Authentication;