const { getGame } = require("../gamelogic/GameData");

class ChatConnection {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    this.isChatBoxOpen = false;
    this.unreadMessagesCount = 0;

    socket.on("send_message", (messageInfo) => this.sendMessage(messageInfo));
    socket.on("display_chat_box", (opened) =>
      this.updateChatBoxDisplay(opened)
    );
  }

  sendMessage(messageInfo) {
    const server = getGame(messageInfo.roomID);

    if (server) {
      this.io.in(server.roomID).emit("recieve_message", messageInfo);

      if (!this.isChatBoxOpen) {
        this.unreadMessagesCount += 1;

        this.socket.in(server.roomID).emit("update_unread_count");
      }
    }
  }

  updateChatBoxDisplay(opened) {
    this.isChatBoxOpen = opened;

    this.socket.emit("update_box_open", this.isChatBoxOpen);

    if (this.isChatBoxOpen) {
      this.unreadMessagesCount = 0;

      this.socket.emit("reset_unreadMessage");
    }
  }
}
module.exports = ChatConnection;
