const { User, Room, Hotel, Booking, Profile } = require('../models')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')
// const valuation = require('../helper/valuation')

class Controller {
    static landingPage(req, res) {
        res.render('landingPage')
    }

    static register(req, res) {
        res.render('register')
    }

    static async postRegister(req, res) {
        try {
            const {email, password, role} = req.body
            await User.create({email, password, role})
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static login(req, res) {
        res.render('login')
    }

    static async postLogin(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new Error('Email/Password not found')
            }
            req.session.userId = user.id
            req.session.userRole = user.role
            res.redirect(`/${user.role.toLowerCase()}`)
        } catch (error) {
            res.send(error);
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                },
                include: Profile
            })
            res.render('role', {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async postProfile(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            const {name, gender, nik, birthDate} = req.body
            await Profile.create({name, gender, nik, birthDate, UserId: req.session.userId})
            res.redirect(`/${user.role.toLowerCase()}`)
        } catch (error) {
            res.send(error)
        }
    }
    
    static async getAllHotel(req, res){
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            const {sort} = req.query
            let data = []

            if (!sort) {
                data = await Hotel.findAll({
                    include: {
                        model: Room,
                        attributes: ['name']
                    }
                })
            } else if (sort === 'low') {
                data = await Hotel.findAll({
                    include: {
                        model: Room,
                        attributes: ['name']
                    },
                    order: [['price', 'asc']]
                })
            } else {
                data = await Hotel.findAll({
                    include: {
                        model: Room,
                        attributes: ['name']
                    },
                    order: [['price', 'asc']]
                })
            }

            res.render("hotel",{data, user})
        } catch (error) {
            res.send(error)
        }
    }

    static async getBookingGuest(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            res.render("formGuest", {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async postBookingGuest(req, res) {
        try {
            const {idHotel} = req.params
            const {
                startDate,
                endDate
            } = req.body
            await Booking.create({
                HotelId: idHotel,
                UserId: req.session.userId,
                startDate,
                endDate
            })
            res.redirect("/guest/hotels")
        } catch (error) {
            res.send(error)
        }
    }

    static async getHotelsByHost(req, res) {
        try {
            const data = await Hotel.findAll({
                include: [
                    {
                        model: User,
                        where: {
                            id: req.session.userId
                        }
                    },
                    {
                        model: Room,
                        attributes: ['name']
                    }
                ]
            }) 
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            res.render('hotel', {data, user})
        } catch (error) {
            res.send(error);
        }
    }

    static async addHotelForm(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            res.render('formAddHost', {user})
        } catch (error) {
            res.send(error);
        }
    }

    static async addHotel(req, res) {
        try {
            const {idHotel} = req.params
            const {
                name,
                rate,
                facility,
                price,
                location
            } = req.body
            await Hotel.create({
                HotelId: idHotel,
                name,
                rate,
                facility,
                price,
                location
            })
            res.redirect("/host/hotels")
        } catch (error) {
            res.send(error);
        }
    }

    static async editHotelForm(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.session.userId
                }
            })
            const hotel = await Hotel.findByPk(req.params.idHotel)
            res.render('formEditHost', {user, hotel})
        } catch (error) {
            res.send(error)
        }
    }

    static async editHotel(req, res) {
        try {
            const {idHotel} = req.params
            const {
                name,
                rate,
                facility,
                price,
                location
            } = req.body
            await Hotel.create({
                HotelId: idHotel,
                name,
                rate,
                facility,
                price,
                location
            })
            res.redirect("/host/hotels")
        } catch (error) {
            res.send(error);
        }
    }

    static async deleteHotel(req, res) {
        try {
            const{idHotel} = req.params;
            let dataHotel = await Hotel.findByPk(idHotel)
            await Hotel.destroy({where:{
                id:idHotel
            }})
            const query = `${dataHotel.name} has been removed`
            res.redirect(`/host/hotels?query=${query}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async addRoomForm(req, res) {
        try {
            const {idHotel} =  req.params
            res.render('formAddRoom', {idHotel})
        } catch (error) {
            res.send(error)
        }
    }

    static async addRoom(req, res) {
        try {
            const {name, roomNumber} = req.body
            const {idHotel} =  req.params
            await Room.create({name, roomNumber, HotelId: idHotel})
            res.redirect('/host/hotels')
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteRoom(req, res) {
        try {
            const {idRoom} = req.body
            const room = await Room.findByPk(idRoom)
            await Room.destroy({where:{
                id:idRoom
            }})
            const query = `${room.name} has been removed`
            res.redirect(`/host/hotels?query=${query}`)
        } catch (error) {
            res.send(error)
        }
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (!err) {
                res.redirect('/')
            }
        })
    }    
}
    

module.exports = Controller