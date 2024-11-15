import { supabase } from './supabase';
import createTables from './database/tables';
import { setupStorage } from './database/storage';
import { initializeSettings } from './database/settings';

export async function setupDatabase() {
  try {
    // Create SQL functions if they don't exist
    const createFunctionsSql = `
      CREATE OR REPLACE FUNCTION execute_sql(sql text)
      RETURNS void AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    await supabase.rpc('execute_sql', { sql: createFunctionsSql });

    // Set up database components
    const tablesError = await createTables(supabase);
    if (tablesError) {
      console.error('Error creating tables:', tablesError);
      return;
    }

    const storageError = await setupStorage(supabase);
    if (storageError) {
      console.error('Error setting up storage:', storageError);
      return;
    }

    const settingsError = await initializeSettings(supabase);
    if (settingsError) {
      console.error('Error initializing settings:', settingsError);
      return;
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}