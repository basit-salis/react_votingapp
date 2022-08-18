const express = require('express');
const session = require('express-session');
const cors = require('cors');
var cookieParser = require('cookie-parser')




const app = express();

// SQL DB CONNECTION
const mydb = require('./config/db.config.js');

//session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(cors());

// //bodyparser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())


//static dir
app.use('/assets',express.static(__dirname + '/assets'));

// Routes
app.use('/user', require('./routes/user'));
app.use('/voter', require('./routes/voter'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/index'));

const PORT = process.env.port || 3001;

app.listen(PORT, () =>{
  console.log(`Server started on ${PORT}`);
});





// 0247921333