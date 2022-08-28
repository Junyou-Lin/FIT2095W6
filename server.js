//Import packages
const express = require('express')
const mongodb = require('mongodb')
const morgan = require('morgan')
const ejs = require('ejs')

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('public/css'))
app.use(express.static('public/imgs'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

const MongoClient = mongodb.MongoClient
const url = 'mongodb://0.0.0.0:27017/'
let db

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log('Err  ', err)
  } else {
    console.log('Connected successfully to server')
    db = client.db('fit2095')
  }
})

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/add', function (req, res) {
  res.render('add')
})

app.get('/delete', function (req, res) {
  res.render('delete')
})

app.get('/deleteBySenderAndWeight', function (req, res) {
  res.render('deleteBySenderAndWeight')
})

app.get('/update', function (req, res) {
  res.render('update')
})

app.get('/list', function (req, res) {
  db.collection('parcels')
    .find({})
    .toArray(function (err, db) {
      res.render('list', { db })
    })
})

app.post('/add', function (req, res) {
  const { sender, address, weight, fragile } = req.body
  if (sender.length < 3 || address.length < 3 || weight < 0) {
    res.render('invalid.html')
    return
  }
  db.collection('parcels').insertOne({
    sender,
    address,
    weight,
    fragile,
  })
  res.redirect('/list')
})

app.post('/delete', function (req, res) {
  const { _id } = req.body
  db.collection('parcels').deleteOne({ _id: mongodb.ObjectId(_id) })
  res.redirect('/list')
})

app.post('/deleteBySenderAndWeight', function (req, res) {
  const { sender, weight } = req.body
  db.collection('parcels').deleteOne({ sender, weight })
  res.redirect('/list')
})

app.post('/update', function (req, res) {
  const { _id, sender, address, weight, fragile } = req.body
  const filter = { _id: mongodb.ObjectId(_id) }
  const theUpdate = {
    $set: {
      sender,
      address,
      weight,
      fragile,
    },
  }
  db.collection('parcels').updateOne(filter, theUpdate)
  res.redirect('/list')
})

app.get('*', (req, res) => {
  res.render('404.html')
})

app.listen(8080)
