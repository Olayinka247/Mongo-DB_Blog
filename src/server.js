import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// ROUTES

//ERROR HANDLING

mongoose.connect(process.env.MONGO_CONNECTION_URL);

mongoose.connection.on("Connected", () => {
  console.log("Mongoose is connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
