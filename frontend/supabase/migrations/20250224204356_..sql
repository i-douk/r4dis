CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE 
    user_role TEXT;
BEGIN
    -- Extract role from metadata
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'user');

    -- Insert into appropriate table based on role
    IF user_role = 'podcaster' THEN
        INSERT INTO public.podcasters (
            id,
            email,
            username,
            created_at,
            updated_at
        ) VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'username', 
                     SPLIT_PART(NEW.email, '@', 1)),
            NEW.created_at,
            NEW.created_at
        );
    ELSE
        INSERT INTO public.users (
            id,
            email,
            username,
            created_at,
            updated_at
        ) VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'username', 
                     SPLIT_PART(NEW.email, '@', 1)),
            NEW.created_at,
            NEW.created_at
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger is still in place
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
