const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

// requiring schemas from schemas
const connect = require("./schemas/index.js");

connect();


// requiring modules from rotuer 
const indexRouter = require("./routes/indexRoutes")


// middleware that allows the apps the request data from database and retireive in JSON form
app.use(express.json());

//using indexRouter middleware
app.use("/api", indexRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my webpage')
})

app.listen(port, () => {
  console.log(`server connection success on ${port}`)
})