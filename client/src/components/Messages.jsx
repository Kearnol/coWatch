import React, { useEffect, useState } from 'react';
import styles from '../css/Messages.module.css';

function Messages({ socket }) {
    const username = window.sessionStorage.getItem("username")
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
        setMessages((prevMessages) => {
            const newMessages = {...prevMessages};
            newMessages[message.id] = message;
            return newMessages;
        });
        };

    const deleteMessageListener = (messageID) => {
        setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
        });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
        socket.off('message', messageListener);
        socket.off('deleteMessage', deleteMessageListener);
    };
}, [socket]);

const removeSeconds = (msgTime) => {
    let time = new Date(msgTime).toLocaleTimeString();
    let newTime = time.slice(0,5) + " " + time.slice(-2);
    return newTime;
}

    return (
        <>
        <h2>You are in the Main chat room.</h2>
        <div className={styles.messageList}>
        {[...Object.values(messages)]
            .sort((b,a) => a.time - b.time)
                .map((message) => {
                    let msgAlign
                    let msgOwner
                    let userColor
                    if(message.user == username){
                        msgAlign = styles.messageRight;
                        msgOwner = styles.selfMessage;
                        userColor = styles.userNameColorSelf
                        } 
                    else if (message.user == "Admin"){
                        msgAlign = styles.messageAdmin
                        msgOwner = styles.adminMessage
                    }
                    else {
                        msgAlign = styles.messageLeft;
                        msgOwner = styles.otherMessage;
                        userColor= styles.userNameColorOther
                    }
                    return(
                    <div
                        key={message.id}
                        className={styles.messageContainer + ' ' + msgOwner}
                        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                    >
                        <div>
                            <span className={styles.date}>{removeSeconds(message.time)}</span>
                            <span className={styles.userName + ' ' + userColor}>{message.user}:</span>
                        </div>
                            <span className={msgAlign}>{message.value}</span>
                    </div>
                    )
                })
        }
        </div>
        </>
    );
}

export default Messages;