const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const { notFound, errorHandler } = require('./middlewares');
const logs = require('./api/logs');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
});
const port = process.env.PORT || 8000;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Travel Log API',
	});
});

app.use('/api/log', logs);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
