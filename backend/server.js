import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoDBConnect from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoutes.js";
import roleRoute from "./routes/roleRutes.js";
import taskRoute from "./routes/taskRoutes.js";
import tagRoute from "./routes/tagRutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import authRoute from "./routes/authRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5050;

app.use(express.static("public"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`Server is running on https://localhost:${PORT}`);
});
