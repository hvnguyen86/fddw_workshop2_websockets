var http = require("http");
var {Server} = require("socket.io");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    var path = url.parse(req.url).pathname;
    var data 
    if(path == "/"){
        data = fs.readFileSync(__dirname + "/index.html");
    } else if(path == "/rooms"){
        data = fs.readFileSync(__dirname + "/rooms.html");
    } else {
        res.writeHead(404);
        res.end("File Not Found");
    }

    res.writeHead(200);
    res.end(data);
    
})

var io = new Server(server);

const workspaces = io.of(/^\/\w+$/);

workspaces.on("connection", socket => {
    const workspace = socket.nsp;
    socket.on("message",function(msg){
        workspace.emit("message",msg);
    });
    
});

server.listen(3000);
console.log("Server listen to port 3000")