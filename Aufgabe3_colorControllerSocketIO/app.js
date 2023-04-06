var http = require("http");
var {Server} = require("socket.io");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    var path = url.parse(req.url).pathname
    if(path == "/index.html" || path == "/controller.html"){
        fs.readFile(__dirname + path,function(err,data){
            if(err){
                res.writeHead(404);
                res.end("File Not Found");
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end("File Not Found");
    }
    
})

var io = new Server(server);

io.on("connection",function(socket){
    socket.on("changecolor",function(socketId,color){
        io.to(socketId).emit("changecolor",color);
    })
});

server.listen(3000);
console.log("Server listen to port 3000")