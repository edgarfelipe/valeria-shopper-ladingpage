import { SupabaseClient } from '@supabase/supabase-js';

export const setupStorage = async (supabase: SupabaseClient) => {
  try {
    // Create bucket
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) throw bucketsError;
    
    const bucketExists = buckets?.some(bucket => bucket.name === 'fotos_valeria');
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket('fotos_valeria', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880
      });
      
      if (createError) throw createError;
    }

    // Set up policies
    const policiesSql = `
      BEGIN;
        DROP POLICY IF EXISTS "Public Access" ON storage.objects;
        DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
        DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

        CREATE POLICY "Public Access" ON storage.objects 
          FOR SELECT USING (bucket_id = 'fotos_valeria');
        
        CREATE POLICY "Authenticated Upload" ON storage.objects 
          FOR INSERT WITH CHECK (
            bucket_id = 'fotos_valeria' 
            AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
          );
        
        CREATE POLICY "Authenticated Delete" ON storage.objects 
          FOR DELETE USING (
            bucket_id = 'fotos_valeria' 
            AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
          );
      COMMIT;
    `;

    const { error: policiesError } = await supabase.rpc('execute_sql', { sql: policiesSql });
    if (policiesError) throw policiesError;

    return null;
  } catch (error) {
    return error;
  }
};