import { Server as ServerSocket, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

interface User {
  user: string;
  id: string;
}

export const setupSocketIO = (server: HttpServer) => {
  const io = new ServerSocket(server);
  const users: User[] = [];

  io.on('connection', (user: Socket) => {
    user.on('newUser', (data: string) => {
      const dataUser: User = { user: data, id: user.id };
      users.push(dataUser);
      console.log(`User ${data} connected with id ${user.id}`);
    });

    user.on('disconnect', () => {
      const index = users.findIndex((element) => element.id === user.id);
      if (index >= 0) {
        console.log(`User ${users[index].user} disconnected`);
        users.splice(index, 1);
      }
    });

    user.on('moveClient', (data: string) => {
      console.log(`User ${user.id} moved: ${data}`);
      user.broadcast.emit('moveServer', data);
    });
  });
};
