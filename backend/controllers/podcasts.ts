/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import { Request, Response } from "express";
import authenticate from "../utils/supaAuth";
import models from "../models";
import { PodcastDTO } from "../dtos/PodcastDTO";
import { sequelize } from "../utils/db";
const podcastsRouter = Router();
// fetch all podcasts //
podcastsRouter.get("/", async (_req: Request, res: Response) => {
  const podcasts = await models.Podcast.findAll({
    include: [
      {
        model: models.Podcaster,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "disabled",
          ],
        },
      },
      {
        model: models.User,
        as: "followers",
        attributes: { exclude: ["username"] },
        through: {
          attributes: { exclude: [] },
        },
      },
    ],
  });
  const podcastsWithFollowCount = await Promise.all(
    podcasts.map(async (podcast) => {
      const followerscount = await models.Following.count({
        where: { podcast_id: podcast.id },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...podcast.toJSON(),
        followerscount,
      };
    }),
  );

  res.json(podcastsWithFollowCount.map((podcast) => new PodcastDTO(podcast)));
});

// fetch all podcasts added by a podcaster //
podcastsRouter.get("/podcaster/:username", async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({
    where: { username: req.params.username },
  });
  if (podcaster) {
    const podcasts = await models.Podcast.findAll({
       
      where: { podcaster_id: podcaster?.toJSON().id },
    });
    res.json(podcasts);
  } else {
    res.status(404).json({ error: "podcaster not found" });
  }
});
// fetch specific podcast by slug //
podcastsRouter.get("/:slug", async (req: Request, res: Response) => {
  const podcast = await models.Podcast.findOne({
    where: { slug: req.params.slug },
  });
  if (podcast) {
    res.status(201).json(podcast);
  } else {
    res.status(404).json({ error: "no podcast matches this slug" });
  }
});

// add podcast by current podcaster //
podcastsRouter.post(
  "/:username",
  authenticate,
  async (req: Request, res: Response) => {
    //check if logged podcaster is the one adding the podcaster
    const podcaster = await models.Podcaster.findOne({
      where: { username: req.params.username },
    });

    // if checked create the podcast
    if (podcaster ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newpod = await models.Podcast.create({
        ...req.body,
        podcaster_id: podcaster.id,
      });
      res.status(201).json(newpod);
    } else {
      res.status(404).json({ error: "Cant add podcast to this podcast" });
    }
  },
);

// add url to list of urls
podcastsRouter.patch(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const podcastId = req.params.id;
    const urlToAdd = req.body.url;
    const podcastToEdit = await models.Podcast.findByPk(podcastId);
    if (podcastToEdit) {
      podcastToEdit.urls = [...podcastToEdit.urls, urlToAdd];
      await podcastToEdit.save();
      res.json(podcastToEdit);
    } else {
      res.status(404).json({ error: "unable to patch urls of this podcast" });
    }
  },
);

// edit podcast
podcastsRouter.put(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const podcastId = req.params.id;
    const { name, description, transcribed, urls ,slug } = req.body;
    const podcastToEdit = await models.Podcast.findByPk(podcastId);
    if (podcastToEdit) {
      podcastToEdit.name = name;
      podcastToEdit.description = description;
      podcastToEdit.transcribed = transcribed;
      podcastToEdit.urls = urls;
      podcastToEdit.slug = slug;
      await podcastToEdit?.save();
      res.json(podcastToEdit);
    } else {
      res
        .status(404)
        .json({ error: "Unable to edit because this podcast doesn't exist" });
    }
  },
);

// delete podcast
podcastsRouter.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const podcastId = req.params.id;
  const podcastToDelete = await models.Podcast.findOne({
    where: { id: podcastId},
  });;
  if (podcastToDelete) {
    await sequelize.transaction(async (transaction) => {
      await models.Podcast.destroy({
        where: { id: podcastId},
        transaction,
      });
    });
    res.status(204).json({ message: "Podcast deleted" });
  } else {
    res.status(404).json({ error: "Podcast not found" });
  }
});


export default podcastsRouter;
