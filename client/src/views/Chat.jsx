import React, {useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import RoomSelector from '../components/RoomSelector';
import AddRoom from '../components/AddRoom';
import ChatRoom from '../components/ChatRoom';
import { Route} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {checkAuth} from '../components/Utils';
import styles from '../css/RoomAddSelect.module.css'

const Chat = ()=>{
    const history = useHistory();
    const [socket, setSocket] = useState(null)
    const [allRooms, setAllRooms] = useState([])
    const [authorized, setAuthorized] = useState(false)

    useEffect( ()=> {
        const newSocket = io(':8000');
        setSocket(newSocket);
        return () =>newSocket.close();        
    }, [setSocket])

    useEffect(()=>{
        checkAuth()
        .then(setAuthorized(true))
        .catch(err=>{if(err){history.push('/401')}})
    },[])

    useEffect(()=>{
        if(socket){
            const roomList = [];
            socket.on('room', (room)=>{
                roomList.push(room);
                setAllRooms(roomList)
            })
        }
    },[socket])



    return(
        <>
        { socket && authorized? (
            <div>
                <Route exact path ={'/chat'}>
                    <div>
                        <Messages socket={socket} />
                        <MessageInput socket={socket} />
                    </div>
                    <div className={styles.chatRoomNav}>
                        <AddRoom socket={socket} className={styles.addChat}/>
                        <RoomSelector socket={socket} className={styles.roomSelect}/>
                    </div>
                </Route>
                <Route exact path={"/chat/:roomName"}>
                    <ChatRoom allRooms={allRooms} socket={socket}/>
                </Route>
            </div>
        ): (
            <div> Not connected </div>
        )}
        </>
    );
}

export default Chat;