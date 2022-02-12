import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
                const roomIdx = newRooms.indexOf(room);
                newRooms = newRooms.slice(0, roomIdx).concat(roomIdx+1);
                return newRooms
            })
        }       
        socket.on('room', roomListener);
        socket.on('delete-room', deleteRoomListener);
        socket.emit('getRooms')
    }, [socket])

    const joinRoom = (room) => {
        socket.emit('join-room', room)    
    }

    return(
        <Stack>
            {
                rooms.filter((room)=> room.includes('chat_')).map((room)=>{return(
                    <Link key={room} to={`/chat/${room.substr(5)}`}>
                        <Button variant="warning" className="btn-sm mt-1 --bs-teal" onClick={()=> joinRoom(room)}> {room.substr(5)} </Button>
                    </Link>
                )})
            }
        </Stack>
    )
}

export default RoomSelector;