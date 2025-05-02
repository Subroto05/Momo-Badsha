// api/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('express');
const db = require('./db');
const pool = require('./db');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true })); // for form submissions

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => res.render('index'));

app.get('/about', (req, res) => res.render('about'));

// Fetch menu items from DB and render
app.get('/menu', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM menu ORDER BY id ASC');
      res.render('menu', { menuItems: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });

app.get('/contact', (req, res) => res.render('contact'));

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await db.query(
            'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        res.redirect('/contact?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting feedback');
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1><a href="/">Go Home</a>');
});

module.exports = app;
