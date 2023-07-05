const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { useTreblle } = require('treblle');
const { PORT, TREBLLE_API_KEY, TREBLLE_PROJECT_ID } = require('./config');

const app = express();
const version = 'v1';

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));


useTreblle(app, {
  apiKey: TREBLLE_API_KEY,
  projectId: TREBLLE_PROJECT_ID,
});

// require all routes
require('./routes')(app, version);

// default route
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Hello world'
  });
});

// block other routes
app.all('*', (req, res) => {
  res.status(405).json({
    status: false,
    message: 'Invalid API route'
  });
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening at PORT ${PORT}`);
});