var http = require("http");
var {Server} = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req,res){
    fs.readFile(__dirname + "/index.html",function(err,data){
        if(err){
            res.writeHead(404);
            res.end("File Not Found");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
})

var io = new Server(server);

io.on("connection",function(socket){
    socket.on("message",function(msg){
        socket.emit("message",msg);
    })
});

server.listen(3000);
console.log("Server listen to port 3000")