CREATE TRIGGER trigger_sync_auth_users_to_public_users
AFTER INSERT OR UPDATE OR DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION sync_auth_users_to_public_users();