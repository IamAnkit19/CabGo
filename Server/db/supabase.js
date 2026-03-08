const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase Credentials not found. Please add SUPABASE_URL and SUPABASE_ANON_KEY to your .env file.");
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co', 
  supabaseKey || 'placeholder-anon-key'
);

module.exports = supabase;
