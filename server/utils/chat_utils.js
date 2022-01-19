const {v4: uuidv4} = require('uuid');
const messages = new Set();
const users = new Map();
const roomMsgs = new Map();



const messageExpirationTimeMS = 5* 60 * 1000;
class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.rooms = this.socket.adapter.rooms
        this.count = io.engine.clientsCount;
        
        socket.on('getMessages', () => this.getMessages());
        socket.on('message', (value, username) => this.handleMessage(value, username));
        socket.on('disconnect', ()=> this.disconnect());
        socket.on('connect_error', (err) => {console.log(`connect_error due to ${err.message}`)
        });
        socket.on('pm', (anotherSocketID, msg) => {
            socket.to(anotherSocketID).emit('pm', socket.id, msg)
        });
        socket.on('create-room', (room) => this.createRoom(room));
        socket.on('join-room', (room) => this.handleJoin(room) );
        socket.on('delete-room', (room) => this.deleteRoom(room));
        socket.on('getRooms', () => this.getRooms() );
        socket.on('roomChat', (value, roomName, username) => this.handleRoomChat(value, roomName, username));
        socket.on('getRoomMsgs', (roomName, socketID) => this.getRoomMsgs(roomName))
        socket.on('leave', room => {socket.leave(`${room}`); console.log("Leave Log: ", this.rooms)})
    }

    sendMessage(message){
        this.io.sockets.emit('message', message);
    }

    getMessages() {
        messages.forEach((message) => this.sendMessage(message));
    }

    getRoomMsgs(roomName){
        let messages = roomMsgs.get(roomName)
        messages.forEach((message) => {console.log("message= ", message); this.io.sockets.to(`chat_${roomName}`).emit('RoomMsg', message)})
    }

    handleMessage(value, username) {
        const message = {
            id: uuidv4(),
            user: username,
            value,
            time: Date.now()
        }
        messages.add(message);
        this.sendMessage(message);

        setTimeout(
            ()=> {
                messages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id)
            },
            messageExpirationTimeMS
        );
    }
    
    createRoom(room){
        roomMsgs.set(`${room}`, 
        [{
            id: uuidv4(),
            user: "Admin",
            value: `Welcome to the ${room} chat room`,
            time: Date.now()
        }]);
        this.io.emit('room', `chat_`+room)
        console.log("Created Room. All Rooms:", this.rooms);
        console.log(this.count)
        
    }

    deleteRoom(room){
        roomMsgs.delete(room)
        this.socket.emit('delete-room', room)
        console.log(`Deleted room: ${room}` )
    }

    getRooms(){
        const allRooms=[]
        for(const [roomName, value] of this.rooms){
            allRooms.push(roomName);
        };
        allRooms.forEach((room) => this.socket.emit('room', room));
    }

    handleJoin(room){
        this.socket.join(room);
        console.log("room attendance", this.rooms)
    }

    //response to socket.on('roomChat')
    handleRoomChat(value, roomName, username) {
        const roomMsg = {
            id: uuidv4(),
            user: username,
            value: value,
            time: Date.now()
        }
        if(roomMsgs.get(roomName)){
            roomMsgs.set(roomName, [...roomMsgs.get(roomName), roomMsg]);
        }
        else{ roomMsgs.set(roomName, roomMsg)}
        console.log("Room Msgs: ", roomMsgs)
        
        this.io.to(`chat_${roomName}`).emit('RoomMsg', roomMsg)
        let name = roomName
        console.log("RoomName", roomName)

        setTimeout(
            ()=>{
                let roomMsgID = roomMsg.id
                let msgArr = roomMsgs.get(name)
                console.log("msgArr", msgArr)
                
                let updatedMsgs 
                if (msgArr.length > 2){
                    updatedMsgs = msgArr.slice(0,1) + msgArr.slice(2) 
                } else {updatedMsgs = msgArr.slice(0,1)}
                roomMsgs.set(name, updatedMsgs)
                console.log("Updated", updatedMsgs)
                roomMsgs.room = updatedMsgs;
                this.io.to(`chat_${name}`).emit("deleteMessage", roomMsgID)
            }, messageExpirationTimeMS
        );
    }

    disconnect() {
        users.delete(this.socket)
    }
}

function chat(io){
    io.on("connection", socket => {
        new Connection(io,socket);
    });
};

module.exports = chat;