const express = require('express');

var app = express();

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page not found');
});

console.log('Philibert now running at 127.0.0.1:8080');
app.listen(8080);
