const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require('./config/index');
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/index");
const sendMail = require('./controller/mail/sendMail');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require("path");
//const nodemailer = require('nodemailer');

const app = express();
//console.log(bodyParser)
app.use(express.json()); 
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(router);
//sendMail.mail();
dbConnect();
app.use(errorHandler);

app.get('/',(req,res)=>{
res.send('Welcome');
})

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })