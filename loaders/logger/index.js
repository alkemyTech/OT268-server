const winston = require('winston');
const dotenv = require('dotenv');



const transports = [];
transports.push(
    new winston.transports.Console(),
);

const LoggerInstance = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.simple(),
    transports
});
//ejemplo:
//logger.info(mensaje)
//https://www.npmjs.com/package/winston

module.exports = LoggerInstance;