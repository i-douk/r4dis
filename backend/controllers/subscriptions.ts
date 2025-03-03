/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import models from "../models";
import authenticate from "../utils/supaAuth";
const subscriptionsRouter = Router();

// GET ALL SUBSCRIPTIONS FOR ADMIN AND SUPERUSER
subscriptionsRouter.get(
  "/",
  authenticate,
  async (_req, res) => {
    const role  = 'admin';
    if (role === "admin") {
    // if (role === "superuser" || role === "admin") {
      const subscriptions = await models.Subscription.findAll({});
      res.status(200).json(subscriptions);
    } else {
      res
        .status(422)
        .json({ message: "not enough persmissions to access subscriptions" });
    }
  },
);

// add subscription to podcaster by authenticated user
subscriptionsRouter.post(
  "/",
  authenticate,
  async (req, res) => {

    const { userId, podcasterId, stipend } = req.body;
    const existingSusbcription = await models.Subscription.findOne({
      where: { userId: userId, podcasterId: podcasterId },
    });
    if (!existingSusbcription) {
      const subscriptionToCreate = {
        podcasterId,
        userId,
        stipend,
      };

      await models.Subscription.create(subscriptionToCreate);
      res.status(201).send(subscriptionToCreate);
    } else {
      res.status(422).json({
        message:
            "There is already a subscription relation tying this user to this podcaster",
      });
    }
   
  },
);

//FREEZE SUBSCRIPTION
subscriptionsRouter.patch(
  "/:id",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const { frozen } = req.body;
    const existingSusbcription = await models.Subscription.findByPk(id);
    if (existingSusbcription) {
      existingSusbcription.frozen = frozen;
      await existingSusbcription.save();
      res.status(200).send(existingSusbcription);
    } else {
      res.status(422).json({ message: "This subscription does not exist" });
    }
  },
);

// delete subscription
subscriptionsRouter.delete(
  "/:id",
  authenticate,
  async (req, res) => {

    const { id } = req.params;
    const subscriptionToDelete = await models.Subscription.findByPk(id);

    if (subscriptionToDelete) {
      await models.Subscription.destroy({
        where: { id: subscriptionToDelete.id },
      });
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ error: "There is no subscription with this id" });
    }
  },
);

export default subscriptionsRouter;
