CREATE POLICY "Allow authenticated users to delete their own files in public folder"
ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatar_images'
  AND (storage.foldername(name))[1] = 'public'
  AND auth.role() = 'authenticated'
  AND auth.uid() = owner
);
