"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupChat = void 0;
const setupChat = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("private-message", (data) => {
            console.log(`Message from ${data.sender} to ${data.receiver}: ${data.content}`);
            io.to(data.receiver).emit("private-message", data);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.setupChat = setupChat;
