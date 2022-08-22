const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.get('/', (req, res) => {
	res.json({
		message: 'Travel Log API',
	});
});

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
