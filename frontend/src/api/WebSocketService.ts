import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8080'); // Substitua pela URL do seu backend

export default socket;
