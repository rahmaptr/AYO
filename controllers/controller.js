const { User, Room, Hotel, Booking, Profile } = require('../models')
const { Op } = require("sequelize");
// const valuation = require('../helper/valuation')

class Controller{
    static async sign(req, res){
        try {
            res.render("sign")
        } catch (error) {
            res.send(error)
        }
    }
    
    static async getAllHotel(req, res){
        try {
            let data = await Hotel.findAll()
            res.render("home",{data})
        } catch (error) {
            res.send(error)
        }
    }

    // static async getStartUp(req, res){
    //     try {
    //         let {sortBy, roleOfFounder} = req.query
    //         // console.log(req.query, "queryyy")
    //         // let query = {}

    //         // console.log(sortBy);
    //         // if(sortBy){
    //         //     query = {
    //         //         order: [
    //         //             [sortBy,'asc'] //ulang di catetan
    //         //         ]
    //         //     }
    //         // }

    //         // const options = {
    //         //     include:{
    //         //         model : Incubator,
    //         //         order : [["roleOfFounder", "ASC"]]
    //         //     },
    //         // }

    //         // if (roleOfFounder) {
    //         //     options.where = {
    //         //         roleOfFounder: roleOfFounder
    //         //     }
    //         // }
    //         // // console.log(roleOfFounder, "wkwkw")
    //         let data = await Startup.getStartUpByRoleOfFounder(Incubator,roleOfFounder)
    //         // res.send(data)
    //         res.render("startup", {data})
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    // }

    // static async incubatorsDetails(req, res){
    //     try {
    //         const {incubatorId} = req.params
    //         const {error} = req.query
    //         // let dataStartup = await Startup.findOne()
    //         let data = await Incubator.findOne({
    //             include: Startup,
    //             where: {
    //                 id: incubatorId
    //             }
    //         })
    //         // console.log(data);
    //        let totalValuation = await Startup.sum('valuation',{
    //         where:{
    //             IncubatorId:incubatorId,
    //             // order: [["valuation","ASC"]]
    //         }
    //        })
        
    //         // res.send(data)
    //         res.render("incubatorsDetails", {data, valuation, totalValuation, error})
    //     } catch (error) {
    //         // console.log(error);
    //         res.send(error)
    //     }
        
    // }
    // static async incubatorsAdd(req, res){
    //     try {
    //         res.render("incubatorsAdd")
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    // }
    // static async incubatorsAddPost(req, res){
    //     try {
    //         const {
    //             name,
    //             code,
    //             location,
    //             level
    //         } = req.body
    //         let data = await Incubator.create({
    //             name,
    //             code,
    //             location,
    //             level
    //         })
    //         // res.send('test')
    //         res.redirect("/")
    //     } catch (error) {

    //         res.send(error)
            
    //     }
    // }
    // static async addStartupToIncubators(req, res){
    //     try {
    //         const {incubatorId} = req.params
    //         let messageError = req.query.error
    //     if(messageError) {
    //         messageError = messageError.split(",")
    //     }
    //         res.render("startupAdd", {incubatorId, messageError})
    //     } catch (error) {
    //         res.send(error)
    //     }
    // }
    // static async addStartupToIncubatorsPost(req, res){
    //     const {incubatorId} = req.params
    //     try {
        
    //         const{startUpName,
    //             founderName,
    //             dateFound,
    //             educationOfFounder,
    //             roleOfFounder,
    //             valuation} = req.body
    //         let data = await Startup.create({
    //             startUpName: startUpName,
    //             founderName,
    //             dateFound,
    //             educationOfFounder,
    //             roleOfFounder,
    //             IncubatorId: incubatorId,
    //             valuation
    //         })
    //         res.redirect(`/${incubatorId}`)
    //     } catch (error) {
    //         console.log(error);
    //         if(error.name === "SequelizeValidationError"){
    //             error = error.errors.map(el=>{
    //                 return el.message
    //             })
    //             // res.send(error);
    //             res.redirect(`/incubators/${incubatorId}/startUp/add?error=${error}`)
    //         } else {
    //             res.send(error)
    //         }
    //     }
    // }
    // static async editStartUp(req, res){
    //     try {
    //         const {incubatorId,startUpId} = req.params
    //         let data = await Startup.findOne({
    //             include:Incubator,
    //              where: { id: startUpId } });
    //         // console.log(data,'<<<<');
    //         res.render("startupsEdit", {data, incubatorId, startUpId})
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    // }
    // static async editStartUpPost(req, res){
    //     try {
    //         const {incubatorId, startUpId} = req.params
    //         const{startUpName,
    //             founderName,
    //             dateFound,
    //             educationOfFounder,
    //             roleOfFounder,
    //             valuation} = req.body
    //         let data = await Startup.update({
    //             startUpName,
    //             founderName,
    //             dateFound,
    //             educationOfFounder,
    //             roleOfFounder,
    //             IncubatorId: incubatorId,
    //             valuation
    //         }, {
    //             where: {
    //                 id: startUpId
    //             }
    //         })
    //         res.redirect(`/incubators/${incubatorId}`)
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    // }
    // static async startupDelete(req, res){
    //     try {
    //         const{incubatorId, startUpId} = req.params;
    //         let dataStartUp = await Startup.findByPk(startUpId)
    //         await Startup.destroy({where:{
    //             id:startUpId
    //         }})

    //         res.redirect(`/incubators/${incubatorId}?error=Start-Up ${dataStartUp.startUpName} with ${dataStartUp.startUpName} as founder has been removed  `)
    //     } catch (error) {
    //         res.send(error)
    //     }
    // }
}

module.exports = Controller

//Start-Up Name with Idaz as founder has been removed  