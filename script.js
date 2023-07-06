const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const { useTreblle } = require('treblle');
const { limiter } = require('./middlewares/ratelimit.middleware');
const { PORT, TREBLLE_API_KEY, TREBLLE_PROJECT_ID } = require('./config');

const app = express();
const version = 'api/v1';


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cors());
app.use(helmet({
    'crossOriginEmbedderPolicy': true,
    'xPoweredBy': false,
    'xFrameOptions': { action: 'deny' }
}));
app.use(limiter);
app.set('views', path.join(__dirname, '/ejs'));
app.set('view engine', 'ejs');


app.use((req, res, next) => {
  res.setHeader('Allow', 'application/json');
  res.setHeader('Content-Type', 'application/json');
  next();
});

useTreblle(app, {
  apiKey: TREBLLE_API_KEY,
  projectId: TREBLLE_PROJECT_ID,
  additionalFieldsToMask: ['token', 'password', 'messageID'],
});

// require all routes
require('./routes')(app, version);

// default route
app.get('/', (req, res) => {
  // send html view for base url only (for email account approval)
  res.render('index', (error, html) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
});
});

// block other routes
app.all('*', (req, res) => {
  res.status(405).json({
    status: false,
    message: 'API route not allowed or supported'
  });
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening at PORT ${PORT}`);
});