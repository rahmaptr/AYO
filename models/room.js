'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Hotel)
    }
  }
  Room.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "Name tidak boleh kosong"
        },
        notEmpty:{
          msg: "Name tidak boleh kosong"

        }
      }
    },
    roomNumber: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "room number tidak boleh kosong"
        },
        notEmpty:{
          msg: "room number tidak boleh kosong"

        }
      }
    },
    HotelId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "HotelId tidak boleh kosong"
        },
        notEmpty:{
          msg: "HotelId tidak boleh kosong"

        }
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};