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
app.use(cors({
  origin: 'http://r4dis.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use("/api/users", usersRouter);
app.use("/api/userlogin", loginUserRouter);
app.use("/api/podcasters", podcastersRouter);
app.use("/api/podcasterlogin", loginPodcasterRouter);
app.use("/api/podcasts", podcastsRouter);
app.use("/api/followings", followingRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/logout", logoutRouter);
app.use(express.json());


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

export default app;