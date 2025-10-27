const fs = require("node:fs"); // Built in Module

// const content = fs.readFileSync("notes.txt", "utf-8");
// console.log(content);

// fs.writeFileSync("copy.txt", content, "utf-8");
// fs.appendFileSync("copy.txt", content, "utf-8");

// fs.mkdirSync("games/xyz/a", { recursive: true });

// fs.rmdirSync('games');

fs.unlinkSync("copy.txt");