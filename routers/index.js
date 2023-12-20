const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/', Controller.sign)

router.get('/guest/hotels', Controller.getAllHotel)
router.get('/guest/hotels/:idHotel/form', Controller.getBookingGuest)
router.post('/guest/hotels/:idHotel/form', Controller.postBookingGuest)



router.get('/host/hotels') //Semua hotel milik host
router.get('/host/hotels/add') //Tambah hotel baru
router.post('/host/hotels/add') //Tambah hotel baru
router.get('/host/hotels/:idHotel/edit') //Edit booking detail
router.post('/host/hotels/:idHotel/edit') //Edit booking detail
router.get('/host/hotels/:idHotel/delete') //Delete hotel

module.exports = router

