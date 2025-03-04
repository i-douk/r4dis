import { User } from "@supabase/supabase-js";
import { supabase } from "./db";
const authenticate = async (req: { headers: { [x: string]: string; }; user: { user: User; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => void) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Validate the Supabase JWT
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = user;
  next();
};

export default authenticate;