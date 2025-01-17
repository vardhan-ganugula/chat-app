import express from 'express';
import http from 'http';
import {Server} from 'socket.io';


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://chat.vardhan.works'],
        methods: ['GET', 'POST']
    }

})

export const getSocketId = (userId) => {
    return onlineUsersMap[userId]
}

let onlineUsersMap = {}



io.on('connection', socket => {
    const userId = socket.handshake.query.userId
    if(userId){
        onlineUsersMap[userId] = socket.id
    }

    io.emit('getOnlineUsers', Object.keys(onlineUsersMap))
    console.log('online users', Object.keys(onlineUsersMap))
    socket.on('disconnect', () => {
        delete onlineUsersMap[userId]
        io.emit('getOnlineUsers', Object.keys(onlineUsersMap))
    })
})



export {io, server, app}