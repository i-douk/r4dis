import { Router } from "express";
import { Request, Response } from "express";
import authenticate from "../../utils/supaAuth";
import { sequelize } from "../../utils/db";
import models from "../../models";
import { UserDTO } from "../../dtos/UserDTO";
const usersRouter = Router();

// all users , subscriptions to podcasters and  followed podcasts
usersRouter.get("/", async (_req: Request, res: Response) => {
  const users = await models.User.scope("defaultScope").findAll({
    include: [
      {
        model: models.Podcast,
        as: "followings",
        through: {
          attributes: { exclude: ["userId", "podcastId"] },
        },
      },
      {
        model: models.Podcaster,
        as: "subscriptions",
        through: {
          attributes: { exclude: ["userId", "podcasterId"] },
        },
      },
    ],
  });
  if (users) {
    const usersDTOs = users.map((user) => new UserDTO(user));
    res.json(usersDTOs);
  } else {
    res.status(404).json({ message: "users not found" });
  }
});
//get single user by id withsubscriptions to podcasters and  followed podcasts
usersRouter.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await models.User.scope("defaultScope").findOne(
    {
      where: {username : username},
      include: [
        {
          model: models.Podcast,
          as: "followings",
          attributes: { exclude: [] },
          through: {
            attributes: { exclude: ["userId", "podcastId"] },
          },
        },
        {
          model: models.Podcaster,
          as: "subscriptions",
          attributes: { exclude: ["email", "premium", "disabled"] },
          through: {
            attributes: { exclude: ["userId", "podcasterId"] },
          },
        },
      ],
    });
  if (user) {
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

// //create a new user
// usersRouter.post("/", async (req: Request, res: Response) => {
//   const { email, username, password } = req.body;
//   const user = await supabase.auth.signUp({
//     email,
//     password,
//   });
//   res.json(user);
// });

// Get a user by id
usersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await models.User.scope("defaultScope").findByPk(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Update a user's username
usersRouter.patch(
  "/:id",
  authenticate,
  async (req, res) => {
    const user = await models.User.findByPk(req.params.id);
    if (user) {
      user.username = req.body.username;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },
);

// Update a user's avatar_url
usersRouter.patch(
  "/:id/avatar",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const user = await models.User.findByPk(id);
    if (user) {
      user.avatar_url = req.body.avatar_url;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },
);

// Update user in bulk
usersRouter.put(
  "/:id",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const { avatar_url, username, about, balance } = req.body;
    const [updateCount, updateUSer] = await models.User.update(
      {
        avatar_url,
        username,
        about,
        balance,
      },
      { where: { id }, returning: true },
    );

    // If the update count is greater than 0, return the updated podcaster
    if (updateCount > 0) {
      res.json(updateUSer[0]);
    } else {
      res.status(422).json({ error: "Failed to update user" });
    }
  },
);

// subscribe to podcaster
usersRouter.post(
  "/:id/subscriptions",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const { podcasterId, stipend } = req.body;
    
    const user = await models.User.findByPk(id);
    const podcaster = await models.Podcaster.findByPk(podcasterId);
    if (user && podcaster) {
      const newRelation = await models.Subscription.create({
        userId: user.id,
        podcasterId,
        stipend,
        paid: stipend > 0 ? true : false,
      });
      res.json(newRelation);
    } else {
      res.status(404).json({ error: "User and podcaster not found" });
    }

  },
);

// follow  podcast
usersRouter.post(
  "/:id/followings",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const { podcastId } = req.body;
    const user = await models.User.findByPk(id);
    const podcast = await models.Podcast.findByPk(podcastId);

    if (user && podcast) {
      const newRelation = await models.Following.create({
        userId: user.id,
        podcastId,
      });
      res.json(newRelation);
    } else {
      res.status(404).json({ error: "User and podcaster not found" });
    }
    
  },
);

// unfollow podcaster
usersRouter.delete(
  "/:id/followings",
  authenticate,
  async (req, res) => {
    const { id } = req.params;
    const { podcastId } = req.body;
  
    const user = await models.User.findByPk(id);
    const podcast = await models.Podcast.findByPk(podcastId);

    if (user && podcast) {
      await models.Following.destroy({
        where: { userId: user.id, podcastId: podcast.id },
      });
      res.status(200).json({ message: "unfollowed" });
    } else {
      res.status(404).json({ error: "User and podcaster not found" });
    }
    
  },
);

// delete user by useusername and subsequentely the active session
usersRouter.delete(
  "/:id",
  authenticate,
  async (req, res) => {   
    const user = await models.User.findByPk(req.params.id);
    if (user) {
      await sequelize.transaction(async (transaction) => {
        await models.User.destroy({ where: { id: user.id }, transaction });
      });
      res.status(204).end();
    }
  },
);

export default usersRouter;
