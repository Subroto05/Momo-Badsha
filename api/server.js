// api/server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware: static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '../public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/menu', (req, res) => res.render('menu'));
app.get('/contact', (req, res) => res.render('contact'));

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1><a href="/">Go Home</a>');
});

// ❌ DON'T use app.listen() here!
// ✅ Instead export the app:
module.exports = app;
