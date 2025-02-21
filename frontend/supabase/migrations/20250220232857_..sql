-- Drop existing constraints if any
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_pkey;

-- Modify the column
ALTER TABLE public.users
ALTER COLUMN id TYPE uuid,
ALTER COLUMN id SET NOT NULL,
ADD CONSTRAINT users_pkey PRIMARY KEY (id),
ADD CONSTRAINT fk_auth_users 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;