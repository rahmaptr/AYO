const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.sign)
router.get('/hotels', Controller.getAllHotel)

module.exports = router

