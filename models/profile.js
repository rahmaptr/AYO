'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static showRoleAndName() {
      return `${this.role} ${this.name}`
    }

    static associate(models) {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "Nama tidak boleh kosong"
        },
        notEmpty:{
          msg: "Nama tidak boleh kosong"

        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "gender tidak boleh kosong"
        },
        notEmpty:{
          msg: "gender tidak boleh kosong"

        }
      }
    },
    nik: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "NIK tidak boleh kosong"
        },
        notEmpty:{
          msg: "NIK tidak boleh kosong"

        }
      }
    },
    birthDate: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull: {
          msg: "birthDate tidak boleh kosong"
        },
        notEmpty:{
          msg: "birthDate tidak boleh kosong"

        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "UserId tidak boleh kosong"
        },
        notEmpty:{
          msg: "UserId tidak boleh kosong"

        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};