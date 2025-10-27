const fs = require("node:fs");

// Task: Read the contents of notes.txt

console.log("Start of script");

// [Sync] => Blocking Operations
const contents = fs.readFileSync("notes.txt", "utf-8");
console.log("Contents", contents);

// [Async] => Non-Blocking Operations
fs.readFile("notes.txt", "utf-8", function (error, data) {
  if (error) console.log(error);
  else console.log("Content got", data);
});

console.log("End of script");