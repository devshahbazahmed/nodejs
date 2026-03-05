const fs = require("node:fs");

// Task read the contents of notes.txt.

console.log("Start of Script");

// [Sync] => Blocking Operations
// const contents = fs.readFileSync("notes.txt", "utf-8");
// console.log("Contents: ", contents);

// [Async] => Non Blocking
fs.readFile("notes.txt", "utf-8", function (err, data) {
  if (err) console.error(err);
  else console.log(data);
});

console.log("End of Script");
