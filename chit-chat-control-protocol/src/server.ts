import * as net from "net";

import ChitChatAgent from "./chitChat/chitChatAgent";

let server = net.createServer();

server.on("connection", (socket) => {
  console.log("Client connected");

  let agent = new ChitChatAgent(socket, (data: string) => {
    console.log("Server received:", data.toString());
  });
  agent.send("Hello, client. -- From server");
});

server.on("close", () => {
  console.log("Closed");
});

server.on("error", (e) => {
  console.log(e);
});

server.listen(8000);
