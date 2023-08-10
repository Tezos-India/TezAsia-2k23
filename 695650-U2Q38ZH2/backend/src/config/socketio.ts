import { Server as ServerSocket, Socket } from "socket.io";
import { Server as HttpServer } from "http";

interface User {
  user: string;
  id: string;
  room?: string;
}

export const setupSocketIO = (server: HttpServer) => {
  const io = new ServerSocket(server);
  const users: User[] = [];

  const rooms: Record<string, string[]> = {};

  io.on("connection", (user: Socket) => {
    user.on("newUser", (data: string) => {
      const dataUser: User = { user: data, id: user.id };
      users.push(dataUser);
      console.log(`User ${data} connected with id ${user.id}`);
    });

    user.on("disconnect", () => {
      const index = users.findIndex((element) => element.id === user.id);
      if (index >= 0) {
        console.log(`User ${users[index].user} disconnected`);
        users.splice(index, 1);
      }
    });

    user.on("createRoom", (room: string) => {
      user.join(room);
      rooms[room] = [user.id];
      console.log(`Room ${room} created by ${user.id}`);
      user.emit("roomCreated", room); // Inform user that room was created
    });

    user.on("joinRoom", (room: string) => {
      const players = rooms[room];
      if (players && players.length === 1) {
        user.join(room);
        players.push(user.id);
        io.to(room).emit("startGame", { fen: "start" });
        console.log(`${user.id} joined room ${room}`);
        user.emit("joinedRoom", room); // Inform user that they successfully joined the room
      } else {
        user.emit("roomError", `Room ${room} is full or doesn't exist`); // Send error back to user
      }
    });

    user.on("moveClient", (data: any) => {
      const { move, room } = data;
      console.log(`User ${user.id} moved: ${move}`);
      if (room) {
        user.to(room).emit("moveServer", move); // Only broadcast to the other user in the same room
      }
    });
  });
};
