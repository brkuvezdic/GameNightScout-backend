import express from "express";
import mongoose from "mongoose";
import listingRouter from "./routes/listing.route.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
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
const __dirname = path.resolve();
app.use(express.json());

app.use(cookieParser());
app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
