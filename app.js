'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const bucketsRouter = require('./src/routes/bucketsRouter');

const app = express();

const port = process.env.PORT || 80;

app.set('views','./src/views');
app.set('view engine','ejs');
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload());



app.use('/',bucketsRouter);


app.listen(port, function(err){
   console.log('running on server on port:'+port);
});