import { io } from "socket.io-client";

const createSocket = (user_id, property_id) => {
console.log('user_id, property_id :', user_id, property_id);
    const socket = io(
        `http://localhost:8678/socket?user_id=${user_id}&property_id=${property_id}`
    );

    socket.on('connect', () => {
        console.log('Connected to socket server');
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    return socket;
};

export default createSocket;
