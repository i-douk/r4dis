CREATE OR REPLACE FUNCTION sync_user_to_custom_table()
RETURNS TRIGGER AS $$
BEGIN
  
  INSERT INTO users (id, username, created_at)
  VALUES (NEW.id, NEW.email, NEW.created_at)  
  ON CONFLICT (id) DO UPDATE
  SET username = NEW.email;  

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the auth.users table
CREATE TRIGGER sync_user_trigger
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_user_to_custom_table();