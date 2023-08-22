import { connect, connection } from "mongoose";

connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export default connection;
