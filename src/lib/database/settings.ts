import { SupabaseClient } from '@supabase/supabase-js';

export const initializeSettings = async (supabase: SupabaseClient) => {
  try {
    const { data: existingSettings, error: checkError } = await supabase
      .from('site_settings')
      .select('id')
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (!existingSettings) {
      const { error: insertError } = await supabase
        .from('site_settings')
        .insert([{
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

      if (insertError) throw insertError;
    }

    return null;
  } catch (error) {
    return error;
  }
};