import io from "socket.io-client"; // Add this
import {Client} from "@stomp/stompjs";

let socket;

const connectSocket = (user_id) => {
  socket = io("https://api.chat.codingmonk.in/", {
    query: `user_id=${user_id}`,
  });
} // Add this -- our server will run on port 4000, so we connect to it from here

export {socket, connectSocket};



export const createStompClient = (loggedUser) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            username: loggedUser?.username,
            password: loggedUser?.hashedPassword,
            simpUser: loggedUser?.id.toString()
        },
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    return client;
}

