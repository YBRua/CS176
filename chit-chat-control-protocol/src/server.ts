import * as net from "net";

import ChitChatAgent from "./chitChat/chitChatAgent";

let server = net.createServer();

server.on("connection", (socket) => {
  console.log("Client connected");

  let agent = new ChitChatAgent(socket, (msg) => {
    console.log("Server received:", msg);
  });
  agent.send("Hello, client. -- From server.");
});

server.listen(8000);
