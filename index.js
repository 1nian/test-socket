const express = require("express");
const app = express();
const http = require("http");
const path = require('path');
const history = require('connect-history-api-fallback')

app.use(history())
app.use(express.static(path.join(__dirname,'dist'))) 

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,{
    cors: true
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", (socket) => {
  socket.on('update:message', (msg) => {
    io.emit('update:message', msg);
  });

  socket.broadcast.emit('hello')
});

server.listen(3101, () => {
  console.log("listening on *:3101");
});
