const express = require('express');
const cors = require('cors');
const chat = require('./utils/chat_utils')
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config()
require('../server/config/mongoose.config');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin:['http://localhost:3000', "http://f9f0-2601-6c0-c280-b2f0-3d04-3918-3641-55.ngrok.io" ]}));
require('./routes/users.routes')(app);

const server = app.listen(port, ()=> console.log(`Listening at port: ${port}.`));

const io = require('socket.io')(server, {cors: true});

chat(io);
