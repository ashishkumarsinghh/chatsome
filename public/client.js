var socket = io();

function send(){
  socket.emit("message", document.getElementById("msg").value);
  document.getElementById("msg").value ="";
  $('#chatarea').animate({scrollTop: $('#chatarea').prop("scrollHeight")}, 500);
}

function enterSend(event){
  if(event.keyCode == 13){
    send();
  }
}

socket.on("message", function(msg){
  let ptext = document.createElement("P");
  ptext.appendChild(document.createTextNode(msg.msg));
  document.getElementById("messages").appendChild(ptext);
});
