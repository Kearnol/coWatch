import React, {useState } from 'react';
import Button from 'react-bootstrap/Button';

const AddRoom = (props) => {
    const [roomName, setRoomName] = useState("")
    const [error, setError] = useState("")
    const {socket, callBack} = props

    const deSpace = (name) => {
        let newString = ""
        for(let letter of name){
            let newLetter = letter
            if(newLetter === " "){
                newLetter = "_"};
            newString += newLetter;
        }
        setRoomName(newString)
        
        return newString
    }

    async function onSubmitHandler(e){
        e.preventDefault();
        if(roomName.length < 1){
            setError("Chat Rooms must be named before adding.")
            return
        }
        socket.emit('create-room', roomName)
        setRoomName("");
        setError("")
        
    }

    const onChangeHandler = (e) => {
        let newName = deSpace(e.target.value);
        setRoomName(newName);
    }

    return (
        <>
        <form onSubmit={onSubmitHandler}>
            <input type="text" value={roomName} placeholder={"Add a chatroom"} onChange={onChangeHandler}/><br/>
            <Button className="mt-1" variant="primary" type="submit">
                Add Chat Room
            </Button>
        </form>
        {error? <p style={{color: "red"}}> {error} </p>:""}
        </>
    )
}

export default AddRoom;