
const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
const mongoose = require('mongoose')
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user')

const app = express();
//Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/node-angular')
  .then(()=> {
    console.log('conexão com o MOngo feita com sucesso')
  })
  .catch((error)=> {console.log("ERROR: "+ error)})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/message',messageRoutes)
app.use('/user',userRoutes)
// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
