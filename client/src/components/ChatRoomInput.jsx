import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import styles from '../css/Chatroom.module.css';


const ChatRoomInput = ({socket}) => {
        const [value, setValue] = useState('');
        const [username] = useState(window.sessionStorage.getItem("username"))
        const {roomName} = useParams();
        const submitForm = (e) => {
            e.preventDefault();
            socket.emit('roomChat', value, roomName, username);
            setValue('');
    };

    return (
        <form onSubmit={submitForm}>
        <input
            autoFocus
            type={"text"}
            className={styles.chatInput}
            value={value}
            placeholder="Type your message"
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
        <input
            type={"submit"}
            className={styles.send}
            value={"send"}
        />
        </form>
    );
};

export default ChatRoomInput;