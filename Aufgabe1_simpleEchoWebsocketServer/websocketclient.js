var ws = require("ws");

var websocket = new ws("ws://localhost:3000");

websocket.on("open", function(){
    websocket.send("Hello World!");
})

websocket.on("message", function(msg){
    console.log(msg.toString());
})