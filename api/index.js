import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Uspješno spojeno na MongoDB!");
  })
  .catch((err) => {
    console.log("Error spajanja na MongoDB " + err);
  });

const app = express();

app.listen(8888, () => {
  console.log("Server radi na portu 8888!");
});

app.use("/api/user", userRouter);
