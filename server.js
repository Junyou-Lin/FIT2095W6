//Import packages
const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs')
const connectDB = require('./config/db')
const parcelRoute = require('./routes/parcelRoute')
const path = require('path')
const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('public/css'))
app.use(express.static('public/imgs'))
app.use(
  '/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
)
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

connectDB()

app.use('/', parcelRoute)

app.get('*', (req, res) => {
  res.render('404.html')
})

app.listen(8080)
