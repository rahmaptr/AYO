'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Hotel, {through: models.Booking, foreignKey: 'UserId'})
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Role tidak boleh kosong'
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};