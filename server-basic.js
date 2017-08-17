// to run the server, config the various routes, start
// the server and deploy to a port of a local machine (development mode)
const express = require('express');

// make a new instance of an express app
var app = express();

// add middleware (built in)
app.use(express.static(__dirname + "/public"));

// ******************************** Route handlers
app.get('/', (req, res) => {
  //send json for example
  res.send({
    name: "Dwyan",
    likes: true
  });
});

app.get('/about', (req, res) => {
  // send some html
  res.send('<h1>About Us</h1>')
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
