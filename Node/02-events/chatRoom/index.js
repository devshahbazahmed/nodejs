const ChatRoom = require("./chatRoom.js");

const chat = new ChatRoom();

chat.on("join", (user) => {
  console.log(`${user} has joined the chat`);
});
chat.on("message", (user, message) => {
  console.log(`${user} : ${message}`);
});
chat.on("leave", (user) => {
  console.log(`${user} has left the chat`);
});

// simulating the events

chat.join("Alice");
chat.join("Bob");

chat.sendMessage("Alice", "Hi Bob! How are you?");
chat.sendMessage("Bob", "Hi Alice! I am fine");
chat.sendMessage("Bob", "How are you Alice?");
chat.sendMessage("Alice", "I am great and happy");

chat.leave("Alice");

chat.sendMessage("Alice", "Hi Bob! How are you?");

chat.leave("Bob");
