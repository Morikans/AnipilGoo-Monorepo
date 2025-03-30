import express from "express";
import cors from "cors";
import { articleRoutes, authRoutes, userRoutes } from "./routes";

const corsOptions = {
  origin: "http://localhost:3000", // 許可するオリジンを指定
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/article", articleRoutes);

export default app;
