import express from "express";
const app = express();
import "express-async-errors";
import config from "./utils/config";
import { connectToDatabase, sequelize } from "./utils/db";
import usersRouter from "./controllers/users/users";
import loginUserRouter from "./controllers/users/loginUser";
import podcastersRouter from "./controllers/podcasters/podcasters";
import loginPodcasterRouter from "./controllers/podcasters/loginPodcaster";
import podcastsRouter from "./controllers/podcasts";
import logoutRouter from "./controllers/logout";
import followingRouter from "./controllers/followings";
import subscriptionsRouter from "./controllers/subscriptions";
import cors from "cors";
app.use(express.json());
app.use(cors({
  origin: ['http://r4dis.com', 'http://r4dis.com', 'http://localhost:5173/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Express routes
app.use("/api/users", usersRouter);
app.use("/api/userlogin", loginUserRouter);
app.use("/api/podcasters", podcastersRouter);
app.use("/api/podcasterlogin", loginPodcasterRouter);
app.use("/api/podcasts", podcastsRouter);
app.use("/api/followings", followingRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/logout", logoutRouter);

// Sync Sequelize models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(config.PORT, async () => {
      await connectToDatabase();
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to sync database:", error);
  });

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer( { port: 8088 });
  
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

export default app;