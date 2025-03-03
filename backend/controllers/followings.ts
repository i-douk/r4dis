import { Router } from "express";
import models from "../models";
import authenticate from "../utils/supaAuth";
import Following from "../models/following";
const followingRouter = Router();

// GET ALL FOLLOWINGS 
followingRouter.get(
  "/",
  async (_req, res) => {
    const followings: Following[] = await models.Following.findAll({});
    res.status(200).json(followings);
  },
);

// ADD FOLLOWING RELATION BETWEEN user and podcast
followingRouter.post(
  "/",
  authenticate,
  async (req , res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { userId, podcastId }: { userId: string; podcastId: string } = req.body;

    // if (role === "superuser" || role === "admin") {
    const existingFollowing = await models.Following.findOne({
      where: { userId, podcastId },
    });
    if (!existingFollowing) {
      const followingAddition = {
        podcastId,
        userId,
      };

      await models.Following.create(followingAddition);
      res.status(201).send(followingAddition);
    } else {
      res.status(422).json({
        message:
            "There is already a following relation tying this user to this podcast",
      });
    }
  },
);

// delete following relation
followingRouter.delete(
  "/:id",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const followingToDelete = await models.Following.findByPk(id);

    if (followingToDelete) {
      await models.Following.destroy({ where: { id: followingToDelete.id } });
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ error: "There is no following relation with this id" });
    }
  },
);

// STAR A FOLLOWING RELATION 
followingRouter.patch(
  "/:id",
  authenticate,
  async (req, res) => {

    const { id } = req.params;
    const followingToStar = await models.Following.findByPk(id);

    if (followingToStar) {
      followingToStar.starred = true;
      await followingToStar.save();
      res.status(201).send(followingToStar);
    } else {
      res
        .status(401)
        .json({ error: "This following relation does not exist" });
    }
  },
);

export default followingRouter;
