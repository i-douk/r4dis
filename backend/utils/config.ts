import "dotenv/config";

const config = {
  DATABASE_URL: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.NODE_ENV === 'test'? process.env.TEST_SECRET : process.env.SECRET,
  SUPABASE_URL:  process.env.NODE_ENV === 'test'? process.env.TEST_SUPABASE_URL : process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY:  process.env.NODE_ENV === 'test'? process.env.TEST_SUPABASE_ANON_KEY : process.env.SUPABASE_ANON_KEY,
};

export default config;
