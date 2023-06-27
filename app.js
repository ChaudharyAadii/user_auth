require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
require("./db/connection")
const router = require('./Routes/router')
const PORT = 5000;


// middleware

app.use(express.json());    // to get data from frontend in json format
app.use(cors());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server is live at port no : ${PORT}`);
})