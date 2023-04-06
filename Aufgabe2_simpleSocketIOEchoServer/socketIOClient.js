const { io } = require("socket.io-client");

var socket = new io("ws://localhost:3000");

socket.on("connect",function(){
    console.log("Verbindung erfolgreich!")
    socket.emit("message","Hello World");
});

socket.on("message",function(msg){
    console.log(msg);
});