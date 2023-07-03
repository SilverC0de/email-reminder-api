const express = require("express");
const morgan = require("morgan");
const { useTreblle } = require("treblle");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const { TREBLE_PROJECT_ID, TREBLE_API_KEY } = process.env;
console.log(TREBLE_API_KEY, TREBLE_PROJECT_ID);
useTreblle(app, {
  apiKey: TREBLE_API_KEY,
  projectId: TREBLE_PROJECT_ID,
});

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at PORT ${PORT}`);
});
