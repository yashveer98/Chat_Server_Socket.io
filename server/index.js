import express from "express";
import { createServer } from 'node:http'
import { Server } from 'socket.io';
import cors from 'cors'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
})
let users = []

app.get('/', (req, res) => {
    res.send('this is home')

})

io.on('connection', (socket) => {

    console.log('a user connected');
    console.log(socket.id)
    users.push(socket.id)
    console.log(users)
    socket.on('chat message', (data, callback) => {
        console.log(data)
        io.to(data.reciver).emit('chat message', data.message)
        callback()
    })
    socket.on('disconnect', () => {
        console.log(socket.id + ' is disconnected')
        users = users.filter((id) => id !== socket.id)
        console.log(users)
    })
})

server.listen(3000, () => {
    console.log('server is connected to port 3000')
})