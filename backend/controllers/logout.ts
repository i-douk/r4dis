import { Router } from "express";
import authenticate from "../utils/supaAuth";
import { supabase } from "../utils/db";
const logoutRouter = Router();

logoutRouter.post(
  "/",
  authenticate,
  async (
    _req,
    res,
  ) => {
    await supabase.auth.signOut();
    res.status(204).end();
  },
);

export default logoutRouter;
