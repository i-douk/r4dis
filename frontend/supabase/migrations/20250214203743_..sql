CREATE POLICY "Allow insert for new users"
ON auth.users
FOR INSERT
WITH CHECK (true);