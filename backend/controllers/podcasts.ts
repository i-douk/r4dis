/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import { Request, Response } from "express";
import authenticate from "../utils/supaAuth";
import models from "../models";
import { PodcastDTO } from "../dtos/PodcastDTO";
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
            "username",
            "disabled",
          ],
        },
      },
      {
        model: models.User,
        as: "followers",
        attributes: { exclude: ["username"] },
        through: {
          attributes: { exclude: ["podcastId", "userId"] },
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

// fetch all porcasts added by a podcaster //
podcastsRouter.get("/:username", async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({
    where: { username: req.params.username },
  });
  if (podcaster) {
    const podcasts = await models.Podcast.findAll({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { podcaster_id: podcaster?.toJSON().id },
    });
    res.json(podcasts);
  } else {
    res.status(404).json({ error: "podcaster not found" });
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

    console.log(podcaster);

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
    const { name, description, transcribed, urls } = req.body;
    const podcastToEdit = await models.Podcast.findByPk(podcastId);
    if (podcastToEdit) {
      podcastToEdit.name = name;
      podcastToEdit.description = description;
      podcastToEdit.transcribed = transcribed;
      podcastToEdit.urls = urls;
      await podcastToEdit?.save();
      res.json(podcastToEdit);
    } else {
      res
        .status(404)
        .json({ error: "Unable to edit because this podcast doesn't exist" });
    }
  },
);

export default podcastsRouter;
