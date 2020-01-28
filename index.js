const dotenv = require('dotenv')

// initialize config
dotenv.config();

const express = require('express');
const knex = require('knex');

const app = express();
const port = 3000;

const db = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	}
});

app.get('/get/categories', async (req, res) => {
	let categories = await db.select().table('categories');

	res.send(categories);
});

app.listen(port, () => console.log(`Server started at port ${port}.`));
