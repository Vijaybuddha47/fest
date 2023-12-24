const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const BUCKET_NAME = 'bdm-flimfest-dev';
const ACCESS_KEY_ID = 'AKIAR6ITYLIGB5BKCG2A';
const SECRET_ACCESS_KEY = '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';
const CLOUD_FRONT_URL = 'https://bdm-flimfest-dev.s3.amazonaws.com/';
const FRONTEND_URL = 'http://203.161.62.204:3000';


module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING,
    BUCKET_NAME,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    CLOUD_FRONT_URL,
    FRONTEND_URL
};