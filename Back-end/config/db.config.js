const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'voting_app'
})

connection.connect((err)=>{
    if (err) throw err;
    console.log(`connected to database`)
})

module.exports = connection;