import { supabase } from "./db";
const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Validate the Supabase JWT
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error) { 
    console.log(error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = user;
  next();
};

export default authenticate;