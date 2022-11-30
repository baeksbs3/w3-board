const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require("./routes/indexRoutes");
require('dotenv').config();

// requiring schemas from schemas
const connect = require("./schemas/index.js");
connect();

//middlewares 
app.use(express.json());
app.use("/api", indexRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my webpage');
});

app.listen(port, () => {
  console.log(`server connection success on ${port}`)
});