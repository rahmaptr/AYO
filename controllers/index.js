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

    static async checkRole(req, res) {
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
            res.redirect(`/${user.role.toLowerCase()}/hotels`)
        } catch (error) {
            res.send(error);
        }
    }
    
    static async getAllHotel(req, res){
        try {
            let data = await Hotel.findAll()
            res.render("hotel",{data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getBookingGuest(req, res) {
        try {
            res.render("formGuest")
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
            let data = await Booking.create({
                HotelId: idHotel,
                startDate,
                endDate
            })
            res.redirect("/guest/hotels", {data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getHotelsByHost(req, res) {
        try {
            const data = await Hotel.findAll()//where UserId = idHost
        } catch (error) {
            res.send(error);
        }
    }

    static async addHotelForm(req, res) {
        try {
            //render form untuk nambah hotel
        } catch (error) {
            res.send(error);
        }
    }

    static async addHotel(req, res) {
        try {
            //Simpan req.body ke hotel
            //redirect ke /host/hotels
        } catch (error) {
            res.send(error);
        }
    }

    static async editHotelForm(req, res) {
        try {
            //
        } catch (error) {
            res.send(error)
        }
    }

    static async editHotel(req, res) {
        try {
            
        } catch (error) {
            res.send(error);
        }
    }

    static async deleteHotel(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}
    

module.exports = Controller