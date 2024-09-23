const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));

app.use("/api", require("./routes/api"));


const PORT = 5555;
app.listen(5555, function () {
  console.log(`Server is running on PORT: ${PORT}`);
});
