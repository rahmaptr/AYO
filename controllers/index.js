const { User, Room, Hotel, Booking, Profile } = require('../models')
const { Op } = require("sequelize");
// const valuation = require('../helper/valuation')

class Controller {
    static async sign(req, res){
        try {
            res.render("sign")
        } catch (error) {
            res.send(error)
        }
    }

    static async checkRole(req, res) {
        try {
            //Buat routing sesuai role
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