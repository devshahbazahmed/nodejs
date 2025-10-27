const http = require("node:http");
const fs = require('node:fs');

const server = http.createServer(function (req, res) {
  const method = req.method;
  const path = req.url;

  const log = `\n[${Date.now()} ${method} ${path}]`;
  fs.appendFileSync('log.txt', log, 'utf-8');

  switch (method) {
    case 'GET': {
      switch (path) {
        case '/':
          return res.writeHead(200).end('Hello from server!');
        case '/contact-us':
          return res.writeHead(200).end('Send, Email: shahbaz@gmail.com, Phone: +91-9999988888');
        case '/tweet':
          return res.writeHead(200).end('Tweet 1\nTweet 2');
      }
    }

    case 'POST': {
      switch (path) {
        case '/tweet':
          return res.writeHead(201).end('You created a tweet');
      }
    }
  }

  return res.writeHead(404).end("You are lost man!");
});

server.listen(8000, () => console.log('Server is running on port: 8000'));