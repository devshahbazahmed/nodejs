const EventEmitter = require("events");

class Chat extends EventEmitter {
  sendMessage(message) {
    console.log(`Message sent: ${message}`);
    this.emit("messageReceived", message);
  }
}

const chat = new Chat();
chat.on("messageReceived", (msg) => {
  console.log(`New Message: ${msg}`);
});

chat.sendMessage("Hello Node");
