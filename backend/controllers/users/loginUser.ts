import { Router } from "express";
import { supabase } from "../../utils/db";

const loginUserRouter = Router();

loginUserRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  const sessionData =  await supabase.auth.getSession();
  console.log(sessionData);

  if (error) return error;
  // Respond with token and user information
  return res
    .status(200)
    .send('authenticated');
});

export default loginUserRouter;
