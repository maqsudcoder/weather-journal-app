// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const myport = 2005; // birth year 😀
const server = app.listen(myport, () => console.log(`running on https://localhost:${myport}`));

// GET route
app.get('/all', (req, res) => res.send(projectData));

// POST route
// adds incoming data to 'projectData'
app.post('/addWeatherData', (req, res) => {
	projectData.temp = req.body.temp;
	projectData.date = req.body.date;
	projectData.feelings = req.body.feelings;
	// projectData.content = data.content;
	res.send(projectData);
});
