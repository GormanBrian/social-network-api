import express, { urlencoded, json } from "express";
import db from "./config/connection.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running at localhost:${PORT}`);
  });
});
