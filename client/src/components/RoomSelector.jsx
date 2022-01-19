import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const RoomSelector =  (props) => {
    const [rooms, setRooms] = useState([])
    const {socket} = props

    useEffect(()=>{
        const roomListener = (room) => {
            setRooms((rooms) => {
                let newRooms = [...rooms, room];
                return newRooms
            });
        };

        const deleteRoomListener = (room) => {
            setRooms((rooms) => {
                let newRooms = [...rooms];
                newRooms = newRooms.pop(room);
                return newRooms
            })
        }       
        socket.on('room', roomListener);
        socket.on('delete-room', deleteRoomListener);
        socket.emit('getRooms')
    }, [socket])

    const joinRoom = (room) => {
        socket.emit( 'join-room', room )    
    }

    return(
        <>
            {
                rooms.filter((room)=> room.includes('chat_')).map((room, i)=>{return(
                    <Link key={i} to={`/chat/${room.substr(5)}`}><button  onClick={()=> joinRoom(room)}> {room.substr(5)} </button></Link>
                )})
            }
        </>
    )
}

export default RoomSelector;