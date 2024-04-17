import { createServer } from 'node:http';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

//Socket.io
io.on('connection', (socket) => {
  //   console.log('A user connected', socket.id);
  socket.on('chat-message', (message) => {
    // console.log("A new user message",message);
    io.emit('chat-message', message);
  });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  return res.sendFile('/public/index.html');
});

server.listen(3000, () => {
  console.log('Server running at PORT:3000');
});
