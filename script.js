const express = require("express");
const morgan = require("morgan");
const { useTreblle } = require("treblle");
const { PORT, TREBLLE_API_KEY, TREBLLE_PROJECT_ID } = require("./config");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

useTreblle(app, {
  apiKey: TREBLLE_API_KEY,
  projectId: TREBLLE_PROJECT_ID,
});

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at PORT ${PORT}`);
});
