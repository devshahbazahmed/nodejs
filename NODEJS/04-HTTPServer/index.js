// const http = require('node:http');

// const server = http.createServer(function (req, res) {
//   console.log('I got an incoming request');
//   // db..

//   res.writeHead(200);
//   res.end('Thanks for visiting my server');
// });

// server.listen(8000, function () {
//   console.log(`HTTP Server is up and running on port 8000`);
// });

const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log(`Incoming request at [${Date.now()}]`);
  // console.log(req.headers);
  // console.log(req.method);
  // console.log(req.url);

  // res.writeHead(201);

  switch (req.url) {
    case '/':
      res.writeHead(200);
      return res.end('Homepage');
    case '/contact-us':
      res.writeHead(200);
      return res.end(`Contact me at shahbaz@gmail.com`);
    case '/about':
      res.writeHead(200);
      return res.end('I am a Software Engineer');
    default:
      res.writeHead(404);
      return res.end('You are lost');
  }
  // res.end(`Hey you can accept ${req.headers['accept-language']}`);
});

server.listen(8000, () => console.log(`HTTP Server is running on port 8000`));