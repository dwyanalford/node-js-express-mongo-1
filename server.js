// server in development mode with Handlebars render engine for client
const express = require('express');
// handlebars
const hbs = require('hbs');
const fs = require('fs');

// make a new instance of an express app
var app = express();

// subdirectory for partials, a helper
hbs.registerPartials(__dirname + '/views/partials');

// tell express what view engine you want to use
app.set('view engine', 'hbs');

// add middleware (built in)
app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server file');
    }
  });
  next();
});
// site under construction page helper to automatically add
// to all pages on the web site.
// app.use( (req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + "/public"));

// making a custom helper function for global unchanging events
// that you will fire many times. Global rules.
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// ******************************** Route handlers
app.get('/', (req, res) => {
  // render template you set up as your view engine
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi there what the f**k is up?'
  });
});

app.get('/about', (req, res) => {
  // render template you set up as your view engine
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/help', (req, res) => {
  // render template you set up as your view engine
  res.render('help.hbs', {
    pageTitle: 'Help Page',
  });
});

app.get('/bad', (req, res) => {
  // send some jason
  res.send({
    errorMessage: 'This is a bad link'
  });
});

// bind app to port on our local machine
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
