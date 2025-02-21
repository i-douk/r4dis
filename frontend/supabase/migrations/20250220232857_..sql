-- Create a function to handle the user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert the new user into public.users
    INSERT INTO public.users (
        id,
        email,
        username,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        -- Extract username from email if not provided
        COALESCE(NEW.raw_user_meta_data->>'username', 
                 SPLIT_PART(NEW.email, '@', 1)),
        NEW.created_at,
        NEW.created_at
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();