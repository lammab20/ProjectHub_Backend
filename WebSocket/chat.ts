import { Server } from "socket.io";

export const setupChat = (io: Server) => {
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
