// api/db.js
const { Pool } = require('pg');

// Configure your PostgreSQL connection here
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Recommended for Vercel + production
    ssl: {
        rejectUnauthorized: false, // Required for some hosted Postgres services (like Render/Heroku)
    },
});

// For local dev (optional fallback)
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'momobadshah',
//     password: 'postgres',
//     port: 5432,
// });

module.exports = {
    query: (text, params) => pool.query(text, params),
};
