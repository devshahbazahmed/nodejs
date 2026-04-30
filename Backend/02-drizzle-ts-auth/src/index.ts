import 'dotenv/config';
import { createServer } from 'node:http';
import { createApplicationServer } from './app/index.js';

async function main() {
  try {
    const server = createServer(createApplicationServer());

    const PORT = process.env.PORT ?? 8080;

    server.listen(PORT, () =>
      console.log(`Server started running on port ${PORT}`)
    );
  } catch (error) {
    console.error('Error starting http server');
    throw error;
  }
}

main();
