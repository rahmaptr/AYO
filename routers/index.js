const express = require('express')
const router = express.Router()
const Controller = require('../controllers')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = file.originalname.split('.').pop();
    const fileExtension = '.' + originalExtension;
    const modifiedFileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
    cb(null, modifiedFileName);
  },
})

const upload = multer({ storage: storage })

const isLogin = (req, res, next) => {
  if (req.session.userId) {
    res.redirect(`/${req.session.userRole.toLowerCase()}`)
  } else {
    next()
  }
}

router.get('/', isLogin, Controller.landingPage)
router.get('/register', isLogin, Controller.register)
router.post('/register', isLogin, Controller.postRegister)
router.get('/login', isLogin, Controller.login)
router.post('/login', isLogin, Controller.postLogin)

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

router.get('/host', Controller.getProfile)
router.post('/host', Controller.postProfile)
router.get('/host/hotels', Controller.getHotelsByHost)
router.get('/host/hotels/add', Controller.addHotelForm)
router.post('/host/hotels/add', upload.single('image') ,Controller.addHotel)
router.get('/host/hotels/:idHotel/edit', Controller.editHotelForm)
router.post('/host/hotels/:idHotel/edit', Controller.editHotel)
router.get('/host/hotels/:idHotel/delete', Controller.deleteHotel)
router.get('/host/hotels/:idHotel/add', Controller.addRoomForm)
router.post('/host/hotels/:idHotel/add', Controller.addRoom)
router.get('/host/hotels/:idHotel/room/:idRoom/delete', Controller.deleteRoom)

router.get('/logout', Controller.logout)

module.exports = router

