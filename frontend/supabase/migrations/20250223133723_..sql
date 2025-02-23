CREATE POLICY "Allow authenticated users to update their own files in public folder"
ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatar_images'
  AND (storage.foldername(name))[1] = 'public'
  AND auth.role() = 'authenticated'
  AND auth.uid() = owner
);
