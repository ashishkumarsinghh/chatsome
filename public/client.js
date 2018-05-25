var socket = io();

function send(){
  let msg_val = document.getElementById("msg").value;
  if(msg_val.startsWith("join")){
    let username = msg_val.substr(5);
    socket.emit("join",username);
    document.getElementById("msg").value ="";
  }
  else{
    socket.emit("message", msg_val);
    document.getElementById("msg").value ="";
    $('#chatarea').animate({scrollTop: $('#chatarea').prop("scrollHeight")}, 500);
  }

}

function enterSend(event){
  if(event.keyCode == 13){
    send();
  }
}

socket.on("join", function(username){
  let notif = document.createElement("DIV");
  notif.classList.add("ui");
  notif.classList.add("success");
  notif.classList.add("message");
  let notif_header = document.createElement("DIV");
  notif_header.classList.add("header");
  notif_header.appendChild(document.createTextNode(username + " has just joined."));
  notif.appendChild(notif_header);
  document.getElementById("messages").appendChild(notif);
});

socket.on("warning", function(warning_msg){
  let wtext = document.createElement("DIV");
  wtext.classList.add("ui");
  wtext.classList.add("negative");
  wtext.classList.add("message");
  let wtext_header = document.createElement("DIV");
  wtext_header.classList.add("header");
  wtext_header.appendChild(document.createTextNode(warning_msg));
  wtext.appendChild(wtext_header);
  document.getElementById("messages").appendChild(wtext);
});
socket.on("message", function(msg){

  let dtext = document.createElement("DIV");
  dtext.classList.add("ui");
  dtext.classList.add("small");
  dtext.classList.add("message");

  let dtext_header = document.createElement("DIV");
  dtext_header.classList.add("header");
  dtext_header.appendChild(document.createTextNode(msg.username));

  let ptext = document.createElement("P");
  ptext.appendChild(document.createTextNode(msg.msg));

  dtext.appendChild(dtext_header);
  dtext.appendChild(ptext);
  document.getElementById("messages").appendChild(dtext);
});
