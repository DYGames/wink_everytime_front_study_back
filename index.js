const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ehduq8234',
  database: 'everytime_study'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'))
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.post('/signup', function (req, res) {
  connection.query(`insert into user values('${req.body.id}', '${req.body.password}')`, (err, results, fields) => {
    if (err) res.json({ error: err })
    else res.json({ data: results })
  })
})

app.get('/signin', function (req, res) {
  connection.query(`select * from user where id = '${req.body.id}' and password = '${req.body.password}')`, (err, results, fields) => {
    if (err) res.json({ error: err })
    else res.json({ data: results })
  })
})

app.listen(3000)