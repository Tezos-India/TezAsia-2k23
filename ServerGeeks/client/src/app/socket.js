import io from "socket.io-client";
const ENDPOINT = "http://localhost:3002";
export default io(ENDPOINT, {
  closeOnBeforeunload: false,
});