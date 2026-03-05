const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = req.url;

  const log = `[${Date.now()}] - ${method} : ${path}\n`;
  fs.appendFileSync("log.txt", log, "utf-8");

  switch (method) {
    case "GET":
      {
        switch (path) {
          case "/":
            return res.writeHead(200).end(`Hello from my server👋`);
          case "/contact-us":
            return res
              .writeHead(200)
              .end(`Contact me at guest@gmail.com and phone +91-9999999999`);
          case "/tweet":
            return res.writeHead(200).end(`Tweet-1 \nTweet-2 \nTweet-3`);
        }
      }
      break;
    case "POST":
      {
        switch (path) {
          case "/tweet": {
            //db task
            return res.writeHead(201).end(`Tweet Posted successfully`);
          }
        }
      }
      break;
  }

  return res.writeHead(404).end(`You are lost!`);
});

server.listen(8000, () => console.log(`Server is running on port 8000`));
