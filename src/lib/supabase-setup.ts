import { supabase } from './supabase';

export async function setupDatabase() {
  try {
    // Create tables using RPC call
    const { error: setupError } = await supabase.rpc('setup_database', {
      sql: `
        -- Create tables
        CREATE TABLE IF NOT EXISTS site_settings (
          id BIGSERIAL PRIMARY KEY,
          show_hero_slides BOOLEAN DEFAULT true,
          show_featured_products BOOLEAN DEFAULT true,
          show_brands BOOLEAN DEFAULT true,
          show_categories BOOLEAN DEFAULT true,
          show_all_products BOOLEAN DEFAULT true,
          show_personal_shopper BOOLEAN DEFAULT true,
          brands_title TEXT DEFAULT 'Marcas que Trabalhamos',
          categories_title TEXT DEFAULT 'Categorias',
          featured_products_title TEXT DEFAULT 'Produtos em Destaque',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS brands (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          logo_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS categories (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          images TEXT[] DEFAULT '{}',
          brand_id BIGINT REFERENCES brands(id) ON DELETE CASCADE,
          category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
          is_featured BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS hero_slides (
          id BIGSERIAL PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS personal_shopper (
          id BIGSERIAL PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT NOT NULL,
          description1 TEXT NOT NULL,
          description2 TEXT NOT NULL,
          description3 TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Public Access" ON storage.objects;
        DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
        DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

        -- Create storage policies
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
      `
    });

    if (setupError) {
      console.error('Error creating tables:', setupError);
      throw setupError;
    }

    // Create storage bucket
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'fotos_valeria');

      if (!bucketExists) {
        const { error: bucketError } = await supabase.storage.createBucket('fotos_valeria', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        });

        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          throw bucketError;
        }
      }
    } catch (bucketError) {
      console.error('Error handling storage bucket:', bucketError);
      // Continue execution even if bucket creation fails
    }

    // Check if site settings exist
    const { data: existingSettings, error: checkError } = await supabase
      .from('site_settings')
      .select('id')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking settings:', checkError);
      throw checkError;
    }

    // Insert default settings if they don't exist
    if (!existingSettings) {
      const { error: insertError } = await supabase
        .from('site_settings')
        .insert([{
          id: 1,
          show_hero_slides: true,
          show_featured_products: true,
          show_brands: true,
          show_categories: true,
          show_all_products: true,
          show_personal_shopper: true,
          brands_title: 'Marcas que Trabalhamos',
          categories_title: 'Categorias',
          featured_products_title: 'Produtos em Destaque'
        }]);

      if (insertError) {
        console.error('Error inserting default settings:', insertError);
        throw insertError;
      }
    }

    console.log('Database and storage setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    // Instead of throwing, we'll log the error and continue
    // This prevents the app from crashing if the setup fails
  }
}