var http = require("http");
var fs = require("fs");
var ws = require("ws");

var server = http.createServer(function(req,res){
    fs.readFile(__dirname + "/index.html",function(err,data){
        if(err){
            res.writeHead(404);
            res.end("File not Found");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    })
});

var wss = new ws.WebSocketServer({server:server});

wss.on("connection", function(websocket){
    websocket.on("message",function(data){
        websocket.send(data.toString());
    })
});

server.listen(3000)
console.log("Server listen port 3000");