const dotenv = require('dotenv');
const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');

// initialize config
dotenv.config();

const app = express();
const port = 1339;

const db = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	}
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/get/categories', async (request, response) => {
	let categories = await db('categories').select();

	response.send(categories);
});

app.get('/get/transactions', async (request, response) => {
	let transactions = await db('transactions').select();

	response.send(transactions);
});

app.post('/add/record', async (request, response) => {
	const date = new Date();
	const createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

	let result = await db('transactions').insert({
		category: request.body.category,
		amount: request.body.amount * 100,
		type: request.body.type,
		created_at: createdAt,
	});
	console.log(request.body);

	response.send('test');
});

app.listen(port, () => console.log(`Server started at port ${port}.`));
