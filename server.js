const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))
app.get('/',(req, res) => res.sendFile(path.resolve('./index.html')))

io.on('connection', function(socket){
  socket.on("message", function(msgs){
    const msg = {"msg":msgs,"id":"stranger"};
    io.emit("message",msg);
  });
});

http.listen(3000, function(){
  console.log("Hello there !")
})
