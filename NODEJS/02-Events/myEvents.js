const EventEmitter = require("node:events"); // imports node:events module

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username) => {
  console.log(`Hello, ${username} and welcome to events in NodeJS`);
});
eventEmitter.on("greet", (username) => {
  console.log(`Hello, ${username} and NodeJS is here`);
});

eventEmitter.once('pushnotify', () => {
  console.log("This event will run only once");
});

// Emit the event
eventEmitter.emit('greet', 'hitesh');
// eventEmitter.emit('greet', 'chai');
// eventEmitter.emit('pushnotify');
// eventEmitter.emit('pushnotify');
// eventEmitter.emit('greet', 'chaicode');

// const myListener = () => console.log("I am a test listener");
// eventEmitter.on("test", myListener);
// eventEmitter.emit("test");
// eventEmitter.emit("test");
// eventEmitter.removeListener("test", myListener);
// eventEmitter.emit("test");

// console.log(eventEmitter.listeners("greet"));