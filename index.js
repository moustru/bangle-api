const express = require('express');
const chalk = require('chalk');
//var pgp = require('pg-promise');

const app = express();
//const db = pgp("postgres://username:password@host:port/database");
const PORT = 8000;
require('./src')(app);

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server is running on port ${PORT}`))
})