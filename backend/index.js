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

// ruteo
const routes = require('./routes');
app.use(process.env.URL_BASE + "/", routes);

// conexión a la base de datos
connectDB();

// servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen in port ${process.env.PORT}`);
});