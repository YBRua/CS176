# CS176 Lecture 04: Introduction to Node.js

## Assignment: Chit-Chat Control Protocol (CCCP)

### Getting Started

#### Building

We will be using `yarn` as the package manager.

To build the application, clone the repository, and execute

```sh
yarn
yarn run tsc
```

#### Running Demo

To run the demo, first build the project, and then set up the server in a shell by

```sh
node .\out\server.js
```

Then start a client in another shell by

```sh
node .\out\client.js
```

### Simple Doc

#### `ChitChatAgent`

A wrapper for ordinary TCP protocol dedicated for transmitting strings. It encapsulates the original string by appending a `ChitHeader`

- `ChitHeader.payloadLength`: A `Uint16` integer that indicates the length of payload string.
- `ChitHeader.checksum`: A hash of `payloadLength` used for validating the header. Packets with invalid header will be ignored.

##### Constructor

`ChitChatAgent(socket: Socket, onData: Function)`

- `socket`: A `net.Socket` TCP Socket connection object
- `onData`: A callback for processing received data. It takes a `string` as input.

After initialization, the agent automatically listens to messages in the socket.

##### Methods

###### `ChitChatAgent.send(msg: string)`

Sends a string through the underlying TCP socket.

- `msg`: A stringified message.

###### `ChitChatAgent.close()`

Closes current session.
