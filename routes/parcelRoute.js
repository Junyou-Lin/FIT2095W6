const express = require('express')
const router = express.Router()
const Parcel = require('../models/parcelModel')

//return the pages
router.get('/', (req, res) => res.render('home'))
router.get('/add', (req, res) => res.render('add'))
router.get('/delete', (req, res) => res.render('delete'))
router.get('/update', (req, res) => res.render('update'))

//logic
router.get('/list', async (req, res) => {
  const parcels = await Parcel.find()
  res.render('list', { parcels })
})

router.get('/listbysender', async (req, res) => {
  const parcels = await Parcel.find()
  res.render('listBySender', { parcels })
})

router.post('/listbysender', async (req, res) => {
  const parcels = await Parcel.find({ sender: req.body.sender })
  res.render('listBySender', { parcels })
})

router.get('/listbyweight', async (req, res) => {
  const parcels = await Parcel.find()
  res.render('listByWeight', { parcels })
})

router.post('/listbyweight', async (req, res) => {
  const { minweight, maxweight } = req.body
  const parcels = await Parcel.find({
    weight: { $gte: minweight, $lte: maxweight },
  })
  res.render('listByWeight', { parcels })
})

router.post('/add', async (req, res) => {
  const { sender, address, weight, fragile } = req.body
  const parcel = new Parcel({ sender, address, weight, fragile })
  await parcel.save()
  res.redirect('/list')
})

router.post('/delete', async (req, res) => {
  const { _id } = req.body
  await Parcel.deleteOne({ _id })
  res.redirect('/list')
})

router.post('/update', async (req, res) => {
  const { _id, sender, address, weight, fragile } = req.body
  await Parcel.updateOne({ _id }, { sender, address, weight, fragile })
  res.redirect('/list')
})

module.exports = router
