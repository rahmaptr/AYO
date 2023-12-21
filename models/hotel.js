'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get formatToIdr() {
      return helper.formatToIdr(this.price)
    }
    
    static associate(models) {
      Hotel.belongsToMany(models.User, {through: models.Booking, foreignKey: 'HotelId'})
      Hotel.hasMany(models.Room)
    }
  }
  Hotel.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "name tidak boleh kosong"
        },
        notEmpty:{
          msg: "name tidak boleh kosong"
        }
      }
    },
    rate: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "rate tidak boleh kosong"
        },
        notEmpty:{
          msg: "rate tidak boleh kosong"
        }
      }
    },
    facility: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "facility tidak boleh kosong"
        },
        notEmpty:{
          msg: "facility tidak boleh kosong"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "price tidak boleh kosong"
        },
        notEmpty:{
          msg: "price tidak boleh kosong"
        },
        isBelowHundredThousand(value) {
          if (value < 100000) {
            throw new Error('Harga harus lebih dari 100000')
          }
        }
      }
    },
    location: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "location tidak boleh kosong"
        },
        notEmpty:{
          msg: "location tidak boleh kosong"
        }
      }
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};