import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { errorHandler } from "./middleware/errorHandler.js";

// Routers
import { healthRouter } from "./routes/health.js";
import { providerRouter } from "./routes/provider.js";
import {userRouter} from './routes/user.js'
import seedRouter from "./routes/seed.js";

dotenv.config();
// console.log(process.env.MONGODB_URI);

// Connect to MongoDB
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 4000;

const app = express();

// View Engine
app.set("views", "./views");
app.set("view engine", "pug");

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());


// Routes
app.get("/", (req, res) => {
  res.render("index")
});

// API Routes
app.use("/api/health", healthRouter);
app.use("/api/providers", providerRouter)
app.use("/api/users", userRouter)
app.use("/api/seed", seedRouter)


// Global error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
