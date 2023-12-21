'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hotel.belongsToMany(models.User, {through: models.Booking, foreignKey: 'HotelId'})
      Hotel.hasMany(models.Room)
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    facility: DataTypes.STRING,
    price: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};