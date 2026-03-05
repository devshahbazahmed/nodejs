const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log(req.method);
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end("Hello to my new server");
    case "/contact-us":
      res.writeHead(200);
      return res.end("Contact me at guest@gmail.com");
    case "/about":
      res.writeHead(200);
      return res.end("I am a Software Engineer");
    default:
      res.writeHead(404);
      return res.end("Page Not found");
  }
});

server.listen(8000, () => console.log("Server started running on port 8000"));
