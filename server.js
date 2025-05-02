const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files (CSS, JS, Images)
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/menu', (req, res) => res.render('menu'));
app.get('/contact', (req, res) => res.render('contact'));

// 404 route
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1><a href="/">Go Home</a>');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));