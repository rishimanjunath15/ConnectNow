import { Server } from "socket.io"

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        },
        transports: ["websocket", "polling"]
    });

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if (connections[path] === undefined) {
                connections[path] = []
            }
            
            if (!connections[path].includes(socket.id)) {
                connections[path].push(socket.id)
                timeOnline[socket.id] = new Date();
            }

            // Emit to all users in the room including the new one
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            // Send existing messages to new user
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }
        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
        })

        socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())
            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k
                        
                        // Notify other users in the room
                        for (let a = 0; a < connections[key].length; ++a) {
                            if (connections[key][a] !== socket.id) {
                                io.to(connections[key][a]).emit('user-left', socket.id)
                            }
                        }

                        var index = connections[key].indexOf(socket.id)
                        connections[key].splice(index, 1)

                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }
            }
            
            // Clean up time tracking
            delete timeOnline[socket.id];
        })
    })

    return io;
}
