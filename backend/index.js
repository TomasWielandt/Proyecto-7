// importaciones
const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen in port ${process.env.PORT}`);
});