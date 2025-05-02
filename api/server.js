// api/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('express');
const supabase = require('./db');

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
// Fetch menu items from DB and render
app.get('/menu', async (req, res) => {
  const { data, error } = await supabase
    .from('menu')
    .select('*');

  if (error) {
    return res.status(500).send('Database query error');
  }

  // Render the menu.ejs template and pass the data
  res.render('menu', { menuItems: data });
});
app.get('/contact', (req, res) => res.render('contact'));

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
  const { name, email, message } = req.body;
  const { error } = await supabase
      .from('feedback')
      .insert([{ name, email, message }]);

  if (error) {
      console.error(error);
      return res.status(500).send('Error submitting feedback');
  }

  res.redirect('/contact?success=true');
});


// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1><a href="/">Go Home</a>');
});

module.exports = app;
