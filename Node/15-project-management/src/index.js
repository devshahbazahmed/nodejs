import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT ?? 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server has started running on http://localhost:${PORT}`),
    );
  })
  .catch((error) => {
    console.error(`MongoDB connection error ${error}`);
    process.exit(1);
  });
