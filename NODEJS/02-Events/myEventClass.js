const EventEmitter = require("node:events");

class Chat extends EventEmitter {
  sendMessage(message) {
    console.log(`Message sent: ${message}`);
    this.emit('messageRecieved', message);
  }
}

const chat = new Chat();
chat.on('messageRecieved', (message) => {
  console.log(`New message: ${message}`);
});

// trigger event
chat.sendMessage('Hello Hitesh');