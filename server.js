const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))
app.get('/',(req, res) => res.sendFile(path.resolve('./index.html')))

io.on('connection', function(socket){
  socket.on("join", function(username){
    socket.username = username;
    io.emit("join", socket.username);
  });

  socket.on("message", function(msgs){
    if(socket.username !== undefined && socket.username !== null && socket.username.length>0){
      const msg = {"msg":msgs,"username":socket.username};
      io.emit("message",msg);
    }
    else{
      io.to(socket.id).emit("warning","Kindly join first by typing <join> <SPACE> <username>.");
    }
  });

});

http.listen(3000, function(){
  console.log("Hello there !")
})
