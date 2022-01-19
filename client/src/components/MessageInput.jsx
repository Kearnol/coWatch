import React, { useState } from 'react';
import styles from '../css/Messages.module.css';

const NewMessage = ({socket}) => {
    const storage = window.sessionStorage
    const username = storage.getItem("username")
    const [value, setValue] = useState('');
        
    const submitForm = (e) => {
            e.preventDefault();
            socket.emit('message', value, username);
            setValue('');
    };

    return (
        <form onSubmit={submitForm}>
        <input
            autoFocus
            value={value}
            className={styles.chatInput}
            placeholder="Type your message"
            onChange={(e) => {
            setValue(e.currentTarget.value);
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

export default NewMessage;