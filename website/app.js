/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'b5def460120bb2b4f2d662d47292aa5d'; // dont steal it 😜

// perform action when click the button
document.getElementById('generate').addEventListener('click', performAction);

// perform action functoin 🎭
function performAction(e) {
	const zipCode = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;
	console.log('zip code', zipCode);

	getData(baseURL, zipCode, apiKey)
		.then(function (data) {
			if (data.cod != '400') {
				postData('/addWeatherData', { temp: data.main.temp, date: newDate, feelings: checkFillings(feelings) });
			} else {
				alert('Invalid zip code');
			}
		})
		.then(function () {
			// run update ui functoin
			updateUI();
		})
		.catch(function (error) {
			alert('Invalid zip code 🏙️');
		});
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get weather data 🌈
const getData = async (baseURL, zipCode, apiKey) => {
	const res = await fetch(`${baseURL}zip=${zipCode},us&appid=${apiKey}`);
	try {
		const data = await res.json();
		console.log('data inside [getData] function', data);

		return data;
	} catch (error) {
		console.log('something is happening here ', error);
	}
};

// POST data ✈️
const postData = async (url = '', data = {}) => {
	console.log('came to postDta', data);
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		// Body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		console.log('new data', newData);
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

// updating ui of app
const updateUI = async () => {
	const request = await fetch('/all');
	try {
		const allData = await request.json();
		document.getElementById('date').innerHTML = `date: ${allData.date}`;
		document.getElementById('temp').innerHTML = `temprature: ${allData.temp}`;
		document.getElementById('content').innerHTML = allData.feelings;
	} catch (error) {
		console.log('error', error);
	}
};

// my helper function
function checkFillings(how) {
	if (how == '') {
		return 'too lazy to say 🦥';
	} else {
		return how;
	}
}
