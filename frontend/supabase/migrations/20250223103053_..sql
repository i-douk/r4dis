-- Allow authenticated users to insert (upload) files
create policy "Allow authenticated users to upload files"
on storage.objects
for insert
with check ( auth.role() = 'authenticated' );