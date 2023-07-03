const express = require("express");
const morgan = require("morgan");
require('dotenv').config(); 


const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.json({ message: "hello world" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app listening at PORT ${PORT}`);
});
