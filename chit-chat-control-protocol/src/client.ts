import * as net from "net";

import ChitChatAgent from "./chitChat/chitChatAgent";

let socket = net.createConnection({
  port: 8000,
  host: "localhost",
});
socket.on("connect", () => {
  let chitchatter = new ChitChatAgent(socket, (msg: string) => {
    console.log("Client received:", msg.toString());
  });
  chitchatter.send("Hello, server! -- From client side.");
  chitchatter.close();
});
