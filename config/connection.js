import mongoose from "mongoose";
import { config } from "dotenv";

config();

mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export default mongoose.connection;
