import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/innges.js";
import { serve } from "inngest/express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js" 

const app = express();

const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(clerkMiddleware()); //this adds auth field to request object (contains session and user ids)

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from api" });
});

app.get("/books", protectRoute, (req, res) => {
  // we pass a array of middleware to express, which flattens it and runs it one by one
  res.status(200).json({ msg: "this is a protected route" });
});

//making app ready for deployment
if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("server is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
