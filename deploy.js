require('dotenv').config();
const shell = require('shelljs');

shell.exec('serverless deploy');
