import http from "node:http";
import { createServerApplication } from "./app/index.js";
import { env } from "./env.js";

async function main() {
  try {
    const server = http.createServer(createServerApplication());

    const PORT = env.PORT ? +env.PORT : 8080;

    server.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
