const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/', Controller.landingPage)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/')
  } else {
    next()
  }
})

router.get('/guest', Controller.getProfile)
router.post('/guest', Controller.postProfile)
router.get('/guest/hotels', Controller.getAllHotel)
router.get('/guest/hotels/:idHotel/form', Controller.getBookingGuest)
router.post('/guest/hotels/:idHotel/form', Controller.postBookingGuest)


router.get('/host', Controller.getProfile)
router.post('/host', Controller.postProfile)
router.get('/host/hotels', Controller.getHotelsByHost)
router.get('/host/hotels/add') //Tambah hotel baru
router.post('/host/hotels/add') //Tambah hotel baru
router.get('/host/hotels/:idHotel/edit') //Edit booking detail
router.post('/host/hotels/:idHotel/edit') //Edit booking detail
router.get('/host/hotels/:idHotel/delete') //Delete hotel

module.exports = router

