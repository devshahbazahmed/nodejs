import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error in connecting to the database: ${err}`);
  });
