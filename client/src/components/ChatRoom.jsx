import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import ChatRoomInput from './ChatRoomInput';
import styles from '../css/Chatroom.module.css';

function ChatRoom(props) {
    const username = window.sessionStorage.getItem("username")
    // const [roomMsgs, setRoomMsgs] = useState({});
    const [roomMsgs, setRoomMsgs] = useState(new Map);
    const {roomName} = useParams();
    const history = useHistory();
    const {socket, allRooms} = props;

    // useEffect(() => {
    //     const messageListener = (roomMsg) => {
    //     console.log("messageListener fired");
    //     setRoomMsgs((prevRoomMsgs) => {
    //         const newMessages = {...prevRoomMsgs};
    //         newMessages[roomMsg.id] = roomMsg;
    //         return newMessages;
    //     });
    //     };

    useEffect(() => {
        const messageListener = (roomMsg) => {
        console.log("messageListener fired");
        setRoomMsgs((prevRoomMsgs) => {
            const newMessages = new Map(prevRoomMsgs);
            newMessages.set(roomMsg.id, roomMsg);
            return newMessages;
        },);
        };

    

    // const deleteMessageListener = (roomMsgID) => {
    //     setRoomMsgs((prevRoomMsgs) => {
    //         const newMessages = {...prevRoomMsgs};
    //         return newMessages
    //     });
    // }

    const deleteMessageListener = (roomMsgID) => {
        console.log("we're getting here at least")
        setRoomMsgs((prevRoomMsgs) => {
            const newMessages = new Map(prevRoomMsgs);
            newMessages.delete(roomMsgID)
            return newMessages
        });
    }
    
    socket.on('RoomMsg', messageListener);
    socket.on('deleteMessage', (roomMsgID) => deleteMessageListener(roomMsgID));
    socket.emit('getRoomMsgs', roomName);

    return (
        socket.offAny()
        )
}, [socket]);

useEffect(()=>{
    if(!allRooms.includes("chat_"+roomName)){
        history.push("/chat")
    }
},[allRooms, roomName, history])

const returnToMain = () => {
    let room = `chat_${roomName}`;
    socket.emit('leave', room);
    history.push('/chat');
    socket.offAny();
}

const removeSeconds = (msgTime) => {
    let time = new Date(msgTime).toLocaleTimeString();
    let newTime = time.slice(0,5) + " " + time.slice(-2);
    return newTime;
}

    return (       
        <>
        <h2>You're in the <span>{roomName}</span> chat room. </h2>
            <div className={styles.chatHeader}>
                    <button className={styles.leaveBtn} onClick={returnToMain}>Leave Chat Room</button>
            </div>
            <div className={styles.messageList}>    
            {[...roomMsgs.values()]
                .sort((b,a) => a.time - b.time)
                .map((message) => {
                    let msgAlign
                    let msgOwner
                    if(message.user == username){
                        msgAlign = styles.messageRight;
                        msgOwner = styles.selfMessage;
                        } 
                    else if (message.user == "Admin"){
                        msgAlign = styles.messageAdmin
                        msgOwner = styles.adminMessage
                    }
                    else {
                        msgAlign = styles.messageLeft;
                        msgOwner = styles.otherMessage;                    }
                    return(
                    <div
                        key={message.id}
                        className={styles.messageContainer + ' ' + msgOwner}
                        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                    >
                        <div>
                            <span className={styles.date}>{removeSeconds(message.time)}</span>
                            <span className={styles.user}>{message.user}:</span>
                        </div>
                            <span className={msgAlign}>{message.value}</span>
                    </div>
                    )
                })
            }
            </div>
            <ChatRoomInput socket={socket}/>
        </>
    );
} 

export default ChatRoom;