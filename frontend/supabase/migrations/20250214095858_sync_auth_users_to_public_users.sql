CREATE OR REPLACE FUNCTION sync_auth_users_to_public_users()
RETURNS TRIGGER AS $$
BEGIN
    -- If a new user is inserted into auth.users
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.users (id, email, created_at, updated_at)
        VALUES (NEW.id, NEW.email, NEW.created_at, NEW.updated_at);

    -- If a user is updated in auth.users
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.users
        SET email = NEW.email,
            updated_at = NEW.updated_at
        WHERE id = NEW.id;

    -- If a user is deleted from auth.users
    ELSIF TG_OP = 'DELETE' THEN
        DELETE FROM public.users
        WHERE id = OLD.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;