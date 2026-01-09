require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connectToDB } = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');


const app = express();
app.use(cors());
app.use(express.json());

connectToDB();

app.use('/',authRoutes);
app.use('/',movieRoutes);

app.listen(process.env.PORT, (err) => {
    if (!err) {
        return console.log(`Server running on port:${process.env.PORT}`);
    }
    else {
        return console.log("Error", err);
    }
})