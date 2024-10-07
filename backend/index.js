// importaciones
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

// middlewares
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// conexión a la base de datos
connectDB();

// servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen in port ${process.env.PORT}`);
});