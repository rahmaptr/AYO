'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    UserId: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "UserId tidak boleh kosong"
        },
        notEmpty:{
          msg: "UserId tidak boleh kosong"

        }
      }
    },
    HotelId: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "HotelId tidak boleh kosong"
        },
        notEmpty:{
          msg: "HotelId tidak boleh kosong"

        }
      }
    },
    startDate: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "startDate tidak boleh kosong"
        },
        notEmpty:{
          msg: "startDate tidak boleh kosong"

        },
        isBefore: {
          msg:'startDate harus sebelum hari ini',
          args: new Date()
        }
      }
    },
    endDate: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "endDate tidak boleh kosong"
        },
        notEmpty:{
          msg: "endDate tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};