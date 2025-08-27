import { io } from "socket.io-client";

const apiServer = 'http://localhost:5173/';

const socket = io(apiServer, {
    transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

export default socket;