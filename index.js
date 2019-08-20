const express = require('express');
var pgp = require('pg-promise');
require('./routes');

const app = express();
//const db = pgp("postgres://username:password@host:port/database");
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})