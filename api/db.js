// api/db.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;


// For local dev (optional fallback)
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'momobadshah',
//     password: 'postgres',
//     port: 5432,
// });

