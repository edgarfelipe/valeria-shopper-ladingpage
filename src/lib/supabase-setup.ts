import { supabase } from './supabase';

export async function setupDatabase() {
  try {
    // Create tables
    const { error: createError } = await supabase.rpc('setup_tables', {
      sql: `
        -- Create hero_slides table
        CREATE TABLE IF NOT EXISTS hero_slides (
          id BIGSERIAL PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Create brands table
        CREATE TABLE IF NOT EXISTS brands (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          logo_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Create categories table
        CREATE TABLE IF NOT EXISTS categories (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Create products table
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

        -- Create personal_shopper table
        CREATE TABLE IF NOT EXISTS personal_shopper (
          id BIGSERIAL PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT NOT NULL,
          description1 TEXT NOT NULL,
          description2 TEXT NOT NULL,
          description3 TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Create site_settings table
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
      `
    });

    if (createError) {
      throw createError;
    }

    // Insert default site settings if not exists
    const { error: insertSettingsError } = await supabase
      .from('site_settings')
      .upsert([{
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
      }], {
        onConflict: 'id'
      });

    if (insertSettingsError) {
      throw insertSettingsError;
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run setup
setupDatabase();