import { Router } from "express";
import { supabase } from "../../utils/db";
import Podcaster from "../../models/podcaster";
import { Request, Response } from "express";

const loginPodcasterRouter = Router();
loginPodcasterRouter.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Step 1: Authenticate with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  // Step 2: Check if the podcaster account is disabled
  const podcaster = await Podcaster.findOne({
    where: { email },
  });

  if (!podcaster) {
    return res.status(401).json({
      error: "Podcaster not found",
    });
  }

  if (podcaster.disabled) {
    return res.status(401).json({
      error: "Podcaster account disabled, please contact admin",
    });
  }

  // Step 3: Return the Supabase token and podcaster information
  return res.status(200).json({
    token: data.session.access_token, // Supabase JWT
    email: podcaster.email,
    username: podcaster.username,
  });
});

export default loginPodcasterRouter;